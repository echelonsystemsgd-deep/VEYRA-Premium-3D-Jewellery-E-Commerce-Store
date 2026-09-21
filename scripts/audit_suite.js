import { chromium } from 'playwright'
import fs from 'fs'

async function runFullAuditSuite() {
  const browser = await chromium.launch({ channel: 'msedge' })
  const report = {
    overflows: {},
    cartTest: false,
    enquiryTest: false,
    soundToggleTest: false,
    heroAnalysis: {}
  }

  const viewports = [
    { name: 'mobile_360', width: 360, height: 740 },
    { name: 'mobile_375', width: 375, height: 812 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'mobile_412', width: 412, height: 915 },
    { name: 'mobile_430', width: 430, height: 932 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'desktop_1440', width: 1440, height: 900 }
  ]

  console.log('--- 1. Testing Horizontal Overflows across all target viewports ---')
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await context.newPage()
    await page.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth
      const winWidth = window.innerWidth
      const bodyWidth = document.body.scrollWidth
      return {
        hasOverflow: docWidth > winWidth || bodyWidth > winWidth,
        scrollWidth: Math.max(docWidth, bodyWidth),
        innerWidth: winWidth,
        diff: Math.max(docWidth, bodyWidth) - winWidth
      }
    })

    report.overflows[vp.name] = overflow
    console.log(`${vp.name} (${vp.width}px): overflow = ${overflow.hasOverflow} (diff: ${overflow.diff}px)`)

    await context.close()
  }

  // --- 2. Interactive End-to-End Tests ---
  console.log('\n--- 2. End-to-End Interactive Flow Tests (Desktop 1440px) ---')
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await desktopCtx.newPage()
  await page.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  // Test Sound Toggle
  console.log('Testing Sound Toggle...')
  const soundBtn = await page.$('button[aria-label="Toggle Sound"]')
  if (soundBtn) {
    const textBefore = await soundBtn.innerText()
    await soundBtn.click()
    await page.waitForTimeout(300)
    const textAfter = await soundBtn.innerText()
    report.soundToggleTest = textBefore.includes('OFF') && textAfter.includes('ON')
    console.log(`Sound Toggle state change: "${textBefore.trim()}" -> "${textAfter.trim()}" (${report.soundToggleTest ? 'PASSED' : 'FAILED'})`)
    await page.screenshot({ path: 'proof_screenshots/interaction_sound_on.png' })
  }

  // Scroll to Collection
  console.log('Navigating to Collection...')
  await page.evaluate(() => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'instant' })
  })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'proof_screenshots/interaction_collection.png' })

  // Open first product modal
  console.log('Opening Product Modal...')
  const productCards = await page.$$('#collection .group')
  if (productCards.length > 0) {
    await productCards[0].click()
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'proof_screenshots/interaction_product_modal.png' })

    // Test Alloy Selector in Modal
    console.log('Testing Alloy Selector...')
    const alloyButtons = await page.$$('button:has(span.rounded-full)')
    if (alloyButtons.length >= 3) {
      await alloyButtons[1].click() // Click bronze
      await page.waitForTimeout(400)
      await page.screenshot({ path: 'proof_screenshots/interaction_alloy_bronze.png' })
      await alloyButtons[2].click() // Click brass
      await page.waitForTimeout(400)
      await page.screenshot({ path: 'proof_screenshots/interaction_alloy_brass.png' })
    }

    // Test Size Selector
    const sizeButtons = await page.$$('button:has-text("9")')
    for (const sb of sizeButtons) {
      const text = await sb.innerText()
      if (text.trim() === '10') {
        await sb.click()
        break
      }
    }

    // Click Add to Bag
    console.log('Clicking "Add to Bag"...')
    const addBtn = await page.$('button:has-text("Add to Bag")')
    if (addBtn) {
      await addBtn.click()
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'proof_screenshots/interaction_cart_drawer_open.png' })

      // Check Cart Drawer Content
      const cartTitle = await page.$('text=YOUR BAG')
      const subtotalEl = await page.$('text=Subtotal')
      const checkoutBtn = await page.$('button:has-text("Proceed to Secure Checkout")')

      if (cartTitle && checkoutBtn) {
        console.log('Cart drawer successfully displayed with item!')
        // Test Checkout Flow
        console.log('Triggering Simulated Secure Checkout...')
        await checkoutBtn.click()
        await page.waitForTimeout(2000) // Wait for simulated checkout timeout
        await page.screenshot({ path: 'proof_screenshots/interaction_checkout_success.png' })

        const confirmedEl = await page.$('text=ACQUISITION CONFIRMED')
        if (confirmedEl) {
          report.cartTest = true
          console.log('Checkout flow end-to-end: PASSED ("ACQUISITION CONFIRMED" achieved)')
        }

        // Close drawer
        const returnBtn = await page.$('button:has-text("Return to Atelier")')
        if (returnBtn) await returnBtn.click()
        await page.waitForTimeout(600)
      }
    }
  }

  // Test Private Viewing / Contact Enquiry Modal
  console.log('\nTesting Private Viewing Enquiry Form...')
  await page.evaluate(() => {
    const el = document.getElementById('care')
    if (el) el.scrollIntoView({ behavior: 'instant' })
  })
  await page.waitForTimeout(800)

  // Find Request Private Viewing link or button
  const reqViewingBtn = await page.$('button:has-text("Request Private Salon Appointment")') || await page.$('button:has-text("Request Viewing")')
  if (reqViewingBtn) {
    await reqViewingBtn.click()
    await page.waitForTimeout(800)
    await page.screenshot({ path: 'proof_screenshots/interaction_enquiry_modal.png' })

    // Fill form
    console.log('Filling enquiry fields...')
    const nameInput = await page.$('input[placeholder="Lord / Lady / Collector"]')
    const emailInput = await page.$('input[placeholder="concierge@collector.com"]')

    if (nameInput && emailInput) {
      await nameInput.fill('Eleanor Vance')
      await emailInput.fill('eleanor@vance-atelier.com')

      // Select salon location button
      const salonBtns = await page.$$('button:has-text("Virtual 3D")')
      if (salonBtns.length > 0) await salonBtns[0].click()

      // Submit
      const submitBtn = await page.$('button:has-text("Confirm Private Viewing Request")')
      if (submitBtn) {
        await submitBtn.click()
        await page.waitForTimeout(1600)
        await page.screenshot({ path: 'proof_screenshots/interaction_enquiry_submitted.png' })

        const confirmed = await page.$('text=CONSULTATION SECURED')
        if (confirmed) {
          report.enquiryTest = true
          console.log('Enquiry form submission: PASSED ("CONSULTATION SECURED" achieved)')
        }

        const closeDossier = await page.$('button:has-text("Close Dossier")')
        if (closeDossier) await closeDossier.click()
        await page.waitForTimeout(500)
      }
    }
  }

  // --- 3. Hero Frame Analysis & Mobile Footprint ---
  console.log('\n--- 3. Analyzing Hero Frame Scrubbing Mechanics & Performance ---')
  const heroStats = await page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    const dpr = window.devicePixelRatio || 1
    return {
      canvasExists: !!canvas,
      canvasWidth: canvas ? canvas.width : 0,
      canvasHeight: canvas ? canvas.height : 0,
      clientWidth: canvas ? canvas.clientWidth : 0,
      clientHeight: canvas ? canvas.clientHeight : 0,
      dpr
    }
  })

  // Measure frames on disk
  const framesDir = 'Public/frames'
  let totalFrameBytes = 0
  let frameCount = 0
  if (fs.existsSync(framesDir)) {
    const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'))
    frameCount = files.length
    for (const f of files) {
      const stat = fs.statSync(`${framesDir}/${f}`)
      totalFrameBytes += stat.size
    }
  }

  report.heroAnalysis = {
    canvasStats: heroStats,
    frameCount,
    totalFrameBytesMB: (totalFrameBytes / (1024 * 1024)).toFixed(2),
    avgFrameSizeBytesKB: frameCount > 0 ? (totalFrameBytes / frameCount / 1024).toFixed(1) : 0
  }

  console.log('Hero Frame Analysis:', report.heroAnalysis)

  await browser.close()
  fs.writeFileSync('proof_screenshots/audit_results.json', JSON.stringify(report, null, 2))
  console.log('\nAudit test suite execution complete. Results saved to audit_results.json.')
}

runFullAuditSuite().catch(console.error)

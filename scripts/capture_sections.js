import { chromium } from 'playwright'

async function captureSectionsAndModals() {
  const browser = await chromium.launch({ channel: 'msedge' })
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // Mobile iPhone viewport
  })
  const page = await context.newPage()

  console.log('Navigating to live site...')
  await page.goto('https://veyra-jewellery.vercel.app/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)

  // 1. Full page mobile screenshot
  console.log('Capturing mobile full page...')
  await page.screenshot({ path: 'proof_screenshots/mobile_375_fullpage.png', fullPage: true })

  // 2. Scroll to Collection
  console.log('Capturing Collection section on mobile...')
  await page.evaluate(() => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView()
  })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'proof_screenshots/mobile_375_collection.png' })

  // 3. Open Product Modal
  console.log('Opening Product Modal...')
  const firstProduct = await page.$('#collection .group')
  if (firstProduct) {
    await firstProduct.click()
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'proof_screenshots/mobile_375_product_modal.png' })
    
    // Switch to 3D tab in modal
    const threeDButton = await page.$('button:has-text("360° 3D Studio")')
    if (threeDButton) {
      await threeDButton.click()
      await page.waitForTimeout(1500)
      await page.screenshot({ path: 'proof_screenshots/mobile_375_modal_3d.png' })
    }

    // Close modal
    const closeBtn = await page.$('button[aria-label="Close Inspection"]')
    if (closeBtn) await closeBtn.click()
    await page.waitForTimeout(800)
  }

  // 4. Open Bag / Cart Drawer
  console.log('Opening Cart Drawer...')
  const bagBtn = await page.$('button[aria-label="View Bag"]')
  if (bagBtn) {
    await bagBtn.click()
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'proof_screenshots/mobile_375_cart_drawer_empty.png' })
    const closeBag = await page.$('button[aria-label="Close Bag"]')
    if (closeBag) await closeBag.click()
    await page.waitForTimeout(800)
  }

  // 5. Open Private Viewing Modal
  console.log('Opening Private Viewing Modal...')
  const menuBtn = await page.$('button[aria-label="Menu"]')
  if (menuBtn) {
    await menuBtn.click()
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'proof_screenshots/mobile_375_menu.png' })
    const privateViewingBtn = await page.$('button:has-text("Request Private Viewing")')
    if (privateViewingBtn) {
      await privateViewingBtn.click()
      await page.waitForTimeout(800)
      await page.screenshot({ path: 'proof_screenshots/mobile_375_private_viewing_modal.png' })
      const closePv = await page.$('button[aria-label="Close"]')
      if (closePv) await closePv.click()
      await page.waitForTimeout(600)
    }
  }

  // 6. Desktop Full Page
  console.log('Capturing Desktop (1440px) sections & modals...')
  const dPage = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await dPage.goto('https://veyra-jewellery.vercel.app/', { waitUntil: 'networkidle' })
  await dPage.waitForTimeout(2000)
  await dPage.screenshot({ path: 'proof_screenshots/desktop_1440_fullpage.png', fullPage: true })

  // Desktop Product Modal
  const dProduct = await dPage.$('#collection .group')
  if (dProduct) {
    await dProduct.click()
    await dPage.waitForTimeout(1500)
    await dPage.screenshot({ path: 'proof_screenshots/desktop_1440_product_modal.png' })
    const dClose = await dPage.$('button[aria-label="Close Inspection"]')
    if (dClose) await dClose.click()
    await dPage.waitForTimeout(800)
  }

  // Desktop Sizing Guide Modal
  console.log('Opening Desktop Sizing Guide...')
  await dPage.evaluate(() => {
    const care = document.getElementById('care')
    if (care) care.scrollIntoView()
  })
  await dPage.waitForTimeout(800)
  const sizingLink = await dPage.$('button:has-text("View Full Ring Sizing Dossier")')
  if (sizingLink) {
    await sizingLink.click()
    await dPage.waitForTimeout(800)
    await dPage.screenshot({ path: 'proof_screenshots/desktop_1440_sizing_modal.png' })
  }

  await browser.close()
  console.log('Comprehensive screenshots complete!')
}

captureSectionsAndModals().catch(console.error)

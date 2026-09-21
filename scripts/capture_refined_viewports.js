import { chromium } from 'playwright'
import fs from 'fs'

async function captureAndVerify() {
  const browser = await chromium.launch({ channel: 'msedge' })
  const viewports = [
    { name: 'refined_mobile_360', width: 360, height: 740 },
    { name: 'refined_mobile_375', width: 375, height: 812 },
    { name: 'refined_mobile_390', width: 390, height: 844 },
    { name: 'refined_mobile_412', width: 412, height: 915 },
    { name: 'refined_mobile_430', width: 430, height: 932 },
    { name: 'refined_tablet_768', width: 768, height: 1024 },
    { name: 'refined_desktop_1440', width: 1440, height: 900 },
  ]

  console.log('Capturing refined viewports...')
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await context.newPage()
    await page.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    // Verify overflow
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth
      const winW = window.innerWidth
      return { hasOverflow: docW > winW, docW, winW }
    })
    console.log(`${vp.name} (${vp.width}px): hasOverflow = ${overflow.hasOverflow}`)

    await page.screenshot({ path: `proof_screenshots/${vp.name}.png` })
    await context.close()
  }

  // Also capture full-page desktop and mobile to verify Provenance and Collection rendering
  console.log('Capturing refined fullpage desktop and mobile...')
  const mContext = await browser.newContext({ viewport: { width: 375, height: 812 } })
  const mPage = await mContext.newPage()
  await mPage.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
  await mPage.waitForTimeout(1000)
  await mPage.screenshot({ path: 'proof_screenshots/refined_mobile_375_fullpage.png', fullPage: true })
  await mContext.close()

  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const dPage = await dContext.newPage()
  await dPage.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
  await dPage.waitForTimeout(1000)
  await dPage.screenshot({ path: 'proof_screenshots/refined_desktop_1440_fullpage.png', fullPage: true })

  // Test Product Modal with Alloy & Cart
  console.log('Testing Product Modal and Cart Drawer...')
  const firstCard = await dPage.$('#collection .group')
  if (firstCard) {
    await firstCard.click()
    await dPage.waitForTimeout(800)
    await dPage.screenshot({ path: 'proof_screenshots/refined_modal_alloy_selector.png' })

    const addBtn = await dPage.$('button:has-text("Add to Bag")')
    if (addBtn) {
      await addBtn.click()
      await dPage.waitForTimeout(800)
      await dPage.screenshot({ path: 'proof_screenshots/refined_cart_drawer.png' })

      const checkoutBtn = await dPage.$('button:has-text("Proceed to Secure Checkout")')
      if (checkoutBtn) {
        await checkoutBtn.click()
        await dPage.waitForTimeout(2000)
        await dPage.screenshot({ path: 'proof_screenshots/refined_checkout_confirmed.png' })
      }
    }
  }

  await dContext.close()
  await browser.close()
  console.log('Refined screenshot verification complete!')
}

captureAndVerify().catch(console.error)

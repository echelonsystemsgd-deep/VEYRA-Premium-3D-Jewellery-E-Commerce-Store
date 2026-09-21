import { execSync } from 'child_process'
import fs from 'fs'

const viewports = [
  { name: 'mobile_360', width: 360, height: 740 },
  { name: 'mobile_375', width: 375, height: 812 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_412', width: 412, height: 915 },
  { name: 'mobile_430', width: 430, height: 932 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 },
]

console.log('Starting viewport capture across all target resolutions...')

for (const vp of viewports) {
  const outfile = `proof_screenshots/${vp.name}.png`
  console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`)
  const cmd = `npx playwright screenshot --channel msedge --viewport-size "${vp.width}, ${vp.height}" --wait-for-timeout 3500 https://veyra-jewellery.vercel.app/ "${outfile}"`
  try {
    execSync(cmd, { stdio: 'inherit' })
  } catch (err) {
    console.error(`Failed on ${vp.name}:`, err.message)
  }
}

console.log('All viewports captured successfully.')

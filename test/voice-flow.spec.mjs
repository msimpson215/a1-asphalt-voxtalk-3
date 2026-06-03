import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const VOXTALK = process.env.VOXTALK_URL || 'http://127.0.0.1:3000'
const LIVE_VOXTALK = 'https://a1-asphalt-voxtalk-3.onrender.com'
const LIVE_A1 = 'https://a1-test-fyjq.onrender.com'

function serveStatic(port, filePath) {
  return new Promise((resolve) => {
    const html = readFileSync(filePath)
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(html)
    })
    server.listen(port, () => resolve(server))
  })
}

async function pageHasBadUi(page) {
  const html = await page.content()
  return (
    html.includes('showMobileVoiceLink') ||
    html.includes('mobile-voice-link') ||
    html.includes('opens full screen')
  )
}

async function testVoxtalkDirect(browser, baseUrl, label) {
  const context = await browser.newContext({
    permissions: ['microphone'],
  })
  const page = await context.newPage()
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 })

  const bad = await pageHasBadUi(page)
  if (bad) throw new Error(`${label}: still has fullscreen/mobile junk UI`)

  const hasOrb = await page.locator('#orb-container').count()
  if (!hasOrb) throw new Error(`${label}: missing orb-container`)

  const hasToggle = await page.evaluate(() => typeof toggleAssistant === 'function')
  if (!hasToggle) throw new Error(`${label}: toggleAssistant missing`)

  console.log(`OK ${label}: clean UI, orb present`)
  await context.close()
}

async function testEmbeddedParent(browser, parentPort, label) {
  const parentUrl = `http://127.0.0.1:${parentPort}/`
  const context = await browser.newContext({ permissions: ['microphone'] })
  const page = await context.newPage()

  await page.goto(parentUrl, { waitUntil: 'networkidle', timeout: 30000 })
  await page.click('#open')

  const iframe = page.frameLocator('#vox-iframe')
  await iframe.locator('#orb-container').waitFor({ state: 'visible', timeout: 15000 })

  const iframeVisible = await page.evaluate(() => {
    const f = document.getElementById('vox-iframe')
    return f && getComputedStyle(f).display !== 'none'
  })
  if (!iframeVisible) throw new Error(`${label}: iframe still hidden after open`)

  const badInIframe = await iframe.locator('body').evaluate((body) =>
    body.innerHTML.includes('full screen')
  )
  if (badInIframe) throw new Error(`${label}: iframe has fullscreen button`)

  console.log(`OK ${label}: iframe visible, orb reachable in one open step`)
  await context.close()
}

async function testLiveA1Broken(browser) {
  const page = await browser.newPage()
  await page.goto(LIVE_A1, { waitUntil: 'networkidle', timeout: 60000 })
  const html = await page.content()
  const hasFakeOrb = html.includes('class="vox-orb"')
  const brokenOpenVox = html.includes("o.style.display='flex';}") && !html.includes('postMessage')
  console.log(
    hasFakeOrb
      ? 'FAIL LIVE A1: still has fake vox-orb (deploy will NOT fix until GitHub updated)'
      : 'OK LIVE A1: fake orb removed'
  )
  if (brokenOpenVox && hasFakeOrb) {
    console.log('FAIL LIVE A1: openVox does not open iframe on menu click')
  }
  await page.close()
}

const browser = await chromium.launch({ headless: true })
let failed = false

async function run(name, fn) {
  try {
    await fn()
  } catch (e) {
    failed = true
    console.error(`FAIL ${name}:`, e.message)
  }
}

try {
  await run('local voxtalk', () => testVoxtalkDirect(browser, VOXTALK, 'local voxtalk'))
  await run('LIVE voxtalk', () => testVoxtalkDirect(browser, LIVE_VOXTALK, 'LIVE voxtalk'))

  const parentServer = await serveStatic(8765, join(__dirname, 'embed-parent-test.html'))
  try {
    await run('fixed parent mock', () => testEmbeddedParent(browser, 8765, 'fixed parent'))
  } finally {
    parentServer.close()
  }

  await testLiveA1Broken(browser)
} finally {
  await browser.close()
}

console.log(failed ? '\nSOME CHECKS FAILED' : '\nALL CHECKS PASSED')
process.exit(failed ? 1 : 0)

import { chromium } from 'playwright'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'docs', 'screenshots')
mkdirSync(outDir, { recursive: true })

const BASE = 'http://localhost:3000'

async function main() {
  const browser = await chromium.launch()

  // --- Desktop screenshots ---
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const dPage = await desktop.newPage()
  await dPage.goto(BASE, { waitUntil: 'load', timeout: 60000 })
  await dPage.waitForTimeout(4000) // let animations settle

  // Full page
  await dPage.screenshot({ path: join(outDir, 'desktop-fullpage.png'), fullPage: true })

  // Hero section
  await dPage.evaluate(() => window.scrollTo(0, 0))
  await dPage.waitForTimeout(500)
  await dPage.screenshot({ path: join(outDir, 'desktop-hero.png') })

  // Sections by scrolling
  const sections = [
    { id: 'sobre', name: 'about' },
    { id: 'metodologia', name: 'methodology' },
    { id: 'programas', name: 'programs' },
    { id: 'equipe', name: 'team' },
    { id: 'depoimentos', name: 'testimonials' },
    { id: 'faq', name: 'faq' },
    { id: 'contato', name: 'contact' },
  ]

  for (const sec of sections) {
    try {
      const el = await dPage.$(`#${sec.id}, [id="${sec.id}"], section:has(h2:text-matches("${sec.id}", "i"))`)
      if (el) {
        await el.scrollIntoViewIfNeeded()
        await dPage.waitForTimeout(800)
        await dPage.screenshot({ path: join(outDir, `desktop-${sec.name}.png`) })
      }
    } catch {
      // section not found, skip
    }
  }

  // --- Mobile screenshots ---
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  })
  const mPage = await mobile.newPage()
  await mPage.goto(BASE, { waitUntil: 'load', timeout: 60000 })
  await mPage.waitForTimeout(4000)

  await mPage.screenshot({ path: join(outDir, 'mobile-hero.png') })
  await mPage.screenshot({ path: join(outDir, 'mobile-fullpage.png'), fullPage: true })

  await browser.close()
  console.log('Screenshots saved to docs/screenshots/')
}

main().catch(e => { console.error(e); process.exit(1) })

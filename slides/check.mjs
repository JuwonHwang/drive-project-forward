#!/usr/bin/env node
// Layout check for slides built from template.html or template-wrapup.html.
// Opens the file in headless Chrome, moves to every slide with the template's show(i), and does this once per
// language (setLang). For each slide it reports content outside the slide, boxes whose content overflows, and the
// line count of the message (.lead), the cover title, and each bullet. It fails when a slide could not be shown,
// so a run that inspected nothing cannot pass.
//
// Usage: node check.mjs <slides.html> [--width 1600 --height 900]
// Requires Node 22 or later (global WebSocket) and Google Chrome or Chromium. CHROME=<path> overrides the browser.
// Exit code: 0 when there are no errors, 1 when there are errors, 2 when the check could not run.

import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? Number(args[i + 1]) : def }
const file = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'))
if (!file || !existsSync(file)) { console.error('usage: node check.mjs <slides.html> [--width 1600 --height 900]'); process.exit(2) }
const width = opt('--width', 1600), height = opt('--height', 900)

const candidates = [process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']
const chrome = candidates.find(p => p && existsSync(p))
if (!chrome) { console.error('Chrome was not found. Set CHROME=<path>.'); process.exit(2) }

const profile = mkdtempSync(join(tmpdir(), 'slides-check-'))
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, `--window-size=${width},${height}`, 'about:blank'], { stdio: 'ignore' })
const cleanup = () => { try { proc.kill() } catch {} try { rmSync(profile, { recursive: true, force: true }) } catch {} }

async function waitFor(fn, ms = 15000) {
  const end = Date.now() + ms
  for (;;) {
    const v = await fn()
    if (v) return v
    if (Date.now() > end) throw new Error('timed out while starting Chrome')
    await new Promise(r => setTimeout(r, 100))
  }
}

// Runs inside the page. Uses only the template's globals: slides, show, setLang, langs.
function inspect() {
  const out = { slides: slides.length, langs: [...langs], results: [] }
  const lineCount = el => {
    const r = el.getBoundingClientRect()
    const lh = parseFloat(getComputedStyle(el).lineHeight)
    return r.height > 0 && lh > 0 ? Math.round(r.height / lh) : 0
  }
  // Lines the author set with <br>, counting only <br> in the shown language.
  const setLines = el => 1 + [...el.querySelectorAll('br')].filter(b => b.getClientRects().length).length
  const text = el => (el.innerText ?? el.textContent).replace(/\s+/g, ' ').trim().slice(0, 60)
  const name = e => `<${e.tagName.toLowerCase()}${e.classList.length ? '.' + [...e.classList].join('.') : ''}>`
  const outside = (r, b) => r.left < b.left - 2 || r.right > b.right + 2 || r.top < b.top - 2 || r.bottom > b.bottom + 2
  for (const lang of langs) {
    setLang(lang)
    for (let i = 0; i < slides.length; i++) {
      show(i)
      const s = slides[i]
      const box = s.getBoundingClientRect()
      const res = { lang, n: i + 1, shown: s.classList.contains('on') && box.height > 0 && cur === i,
        title: '', errors: [], warnings: [], lead: null }
      const title = s.querySelector('.title')
      res.title = title ? text(title) : ''
      if (!res.shown) { res.errors.push('slide was not shown'); out.results.push(res); continue }
      const visible = [...s.querySelectorAll('*')].filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden')
      if (!visible.some(e => e.textContent.trim())) res.errors.push(`no visible text in language ${lang}`)
      const html = visible.filter(e => !(e.closest('svg') && e.tagName.toLowerCase() !== 'svg'))
      for (const e of html) {
        const r = e.getBoundingClientRect()
        if ((r.width || r.height) && outside(r, box)) { res.errors.push(`outside the slide: ${name(e)} "${text(e)}"`); break }
      }
      // A child drawn outside its box: compared by position, because inline SVG adds a few pixels to scrollHeight.
      for (const c of s.querySelectorAll('.figure, .zoom, .side, .locator, .options, .option, .opt-fig, table')) {
        if (!c.getClientRects().length) continue
        const cr = c.getBoundingClientRect()
        const bad = html.find(e => e !== c && c.contains(e) && (() => { const r = e.getBoundingClientRect(); return (r.width || r.height) && outside(r, cr) })())
        if (bad) res.errors.push(`${name(bad)} "${text(bad)}" extends outside ${name(c)}`)
      }
      for (const e of html) if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX !== 'visible' && !e.closest('svg'))
        res.errors.push(`text cut off horizontally in ${name(e)} "${text(e)}"`)
      // SVG text must stay inside the SVG's drawing area.
      for (const svg of s.querySelectorAll('svg')) {
        const sr = svg.getBoundingClientRect()
        if (!sr.width) continue
        for (const t of svg.querySelectorAll('text')) {
          if (!t.getClientRects().length) continue
          const r = t.getBoundingClientRect()
          if (r.width && (r.left < sr.left - 1 || r.right > sr.right + 1 || r.top < sr.top - 1 || r.bottom > sr.bottom + 1)) {
            res.errors.push(`SVG text outside its figure: "${text(t)}"`)
            break
          }
        }
      }
      const lead = [...s.querySelectorAll('.lead')].find(e => e.getClientRects().length)
      if (lead) {
        res.lead = text(lead)
        const n = lineCount(lead)
        if (n > 2) res.errors.push(`message has ${n} lines (at most 2): "${res.lead}"`)
        else if (n > setLines(lead)) res.warnings.push(`message breaks where no <br> is set (${n} lines): "${res.lead}"`)
      }
      if (title) {
        const n = lineCount(title)
        if (s.classList.contains('cover') && n > 3) res.errors.push(`cover title has ${n} lines (at most 3)`)
        else if (!s.classList.contains('cover') && n > setLines(title)) res.warnings.push(`title breaks where no <br> is set (${n} lines)`)
      }
      for (const li of s.querySelectorAll('ul.points > li')) {
        if (!li.getClientRects().length) continue
        const n = lineCount(li)
        if (n > setLines(li)) res.warnings.push(`bullet breaks where no <br> is set (${n} lines): "${text(li)}"`)
      }
      out.results.push(res)
    }
  }
  show(0)
  return out
}

let code = 0
try {
  const port = await waitFor(() => {
    const f = join(profile, 'DevToolsActivePort')
    return existsSync(f) && readFileSync(f, 'utf8').split('\n')[0]
  })
  const targets = await waitFor(async () => {
    try { return (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter(t => t.type === 'page') } catch { return null }
  })
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl)
  await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail })
  let id = 0
  const pending = new Map()
  const events = []
  ws.onmessage = m => {
    const msg = JSON.parse(m.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) } else events.push(msg)
  }
  const send = (method, params = {}) => new Promise(ok => { const i = ++id; pending.set(i, ok); ws.send(JSON.stringify({ id: i, method, params })) })

  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: pathToFileURL(resolve(file)).href })
  await waitFor(() => events.some(e => e.method === 'Page.loadEventFired'))
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true })

  const r = await send('Runtime.evaluate', { expression: `(${inspect})()`, returnByValue: true })
  ws.close()
  if (r.result?.exceptionDetails) {
    console.error('The check could not run in the page. The file must keep the template script (slides, show, setLang, langs).')
    console.error(r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text)
    code = 2
  } else {
    const { slides: total, langs, results } = r.result.result.value
    let errors = 0, warnings = 0
    for (const res of results) {
      if (!res.errors.length && !res.warnings.length) continue
      console.log(`[${res.lang}] slide ${res.n}: ${res.title}`)
      for (const e of res.errors) { console.log(`  error: ${e}`); errors++ }
      for (const w of res.warnings) { console.log(`  warning: ${w}`); warnings++ }
    }
    const checked = results.filter(x => x.shown).length
    console.log(`\nMessages in order (${langs[langs.length - 1]}):`)
    for (const res of results.filter(x => x.lang === langs[langs.length - 1]))
      console.log(`  ${res.n}. ${res.title}${res.lead ? '\n     ' + res.lead : ''}`)
    console.log(`\nChecked ${checked} of ${total * langs.length} slide views (${total} slides x languages ${langs.join(', ')}).`)
    console.log(`${errors} errors, ${warnings} warnings.`)
    if (total === 0 || checked !== total * langs.length || errors) code = 1
  }
} catch (e) {
  console.error(e.message)
  code = 2
} finally {
  cleanup()
}
process.exit(code)

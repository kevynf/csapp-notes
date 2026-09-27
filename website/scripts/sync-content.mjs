import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)))
const DOCS = path.join(ROOT, 'website', 'src', 'content', 'docs')
const PUBLIC = path.join(ROOT, 'website', 'public', 'content')
const SKIP_DIRS = new Set(['.git', '.vitepress', 'node_modules', 'website', 'work'])
const TEXT_EXTENSIONS = new Set(['.md'])

function walk(directory) {
  const files = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (SKIP_DIRS.has(entry.name) || entry.name.startsWith('.')) continue
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...walk(file))
    else if (entry.isFile()) files.push(file)
  }
  return files
}

function sourceRelative(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, '/')
}

function destinationRelative(relative) {
  const segments = relative.split('/')
  const filename = segments.pop()
  const directories = segments.map(slugSegment)
  if (filename === 'README.md') return [...directories, 'index.md'].join('/')
  const basename = filename.slice(0, -'.md'.length)
  return [...directories, `${slugSegment(basename)}.md`].join('/')
}

function slugSegment(segment) {
  return segment.normalize('NFKC').replaceAll('.', '-').toLowerCase()
}

function routeFor(relative) {
  if (relative === 'README.md') return '/'
  const withoutExtension = relative.endsWith('/README.md')
    ? relative.slice(0, -'README.md'.length)
    : relative.slice(0, -'.md'.length)
  const slug = withoutExtension.split('/').filter(Boolean).map(slugSegment).join('/')
  return `/${slug}/`
}

function titleOf(text, fallback) {
  return text.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback
}

function removePageTitle(text) {
  let removed = false
  return outsideFences(text, (line) => {
    if (!removed && /^#\s+.+$/m.test(line)) {
      removed = true
      return ''
    }
    return line
  })
}

function yamlTitle(title) {
  return title.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('\n', ' ')
}

function outsideFences(text, transform) {
  let fence = null
  return text.split(/(?<=\n)/).map((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/)
    if (marker) {
      if (!fence) fence = marker[1]
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null
      return line
    }
    return fence ? line : transform(line)
  }).join('')
}

function transformLinks(text, source, markdownRoutes, assetRoutes) {
  const linkPattern = /(!?\[[^\]\n]*\]\()(<[^>]+>|[^)\n]+)(\))/g
  return outsideFences(text, (line) => line.replace(linkPattern, (full, prefix, raw, suffix) => {
    const value = raw.trim().replace(/^<|>$/g, '')
    const hash = value.indexOf('#')
    const pathPart = hash === -1 ? value : value.slice(0, hash)
    const fragment = hash === -1 ? '' : value.slice(hash)
    if (!pathPart || /^[a-z][a-z0-9+.-]*:/i.test(pathPart) || pathPart.startsWith('/')) return full
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(source), pathPart))
    if (markdownRoutes.has(target)) return `${prefix}${markdownRoutes.get(target)}${fragment}${suffix}`
    if (assetRoutes.has(target)) return `${prefix}${assetRoutes.get(target)}${fragment}${suffix}`
    return full
  }))
}

const allFiles = walk(ROOT)
const websiteReadme = path.join(ROOT, 'website', 'README.md')
const markdownFiles = [
  ...allFiles.filter((file) => TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())),
  ...(fs.existsSync(websiteReadme) ? [websiteReadme] : [])
]
const markdownRoutes = new Map()
for (const file of markdownFiles) {
  const relative = sourceRelative(file)
  markdownRoutes.set(relative, routeFor(relative))
}
const assetRoutes = new Map()
for (const file of allFiles.filter((file) => !TEXT_EXTENSIONS.has(path.extname(file).toLowerCase()))) {
  const relative = sourceRelative(file)
  assetRoutes.set(relative, `/content/${relative}`)
}

fs.rmSync(DOCS, { recursive: true, force: true })
fs.rmSync(PUBLIC, { recursive: true, force: true })
fs.mkdirSync(DOCS, { recursive: true })
fs.mkdirSync(PUBLIC, { recursive: true })

for (const file of markdownFiles) {
  const relative = sourceRelative(file)
  const target = path.join(DOCS, destinationRelative(relative))
  const original = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
  const body = transformLinks(removePageTitle(original), relative, markdownRoutes, assetRoutes)
  const title = titleOf(original, path.basename(file, '.md'))
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, `---\ntitle: "${yamlTitle(title)}"\n---\n\n${body}`, 'utf8')
}

for (const file of allFiles.filter((file) => !TEXT_EXTENSIONS.has(path.extname(file).toLowerCase()))) {
  const relative = sourceRelative(file)
  const target = path.join(PUBLIC, relative)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(file, target)
}

console.log(`Prepared ${markdownFiles.length} Markdown pages and ${assetRoutes.size} static assets.`)

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT || 3000)
const app = next({ dev })
const handle = app.getRequestHandler()

const rootStaticFiles = [
  '/robots.txt',
  '/sitemap.xml'
]

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, 'static', parsedUrl.pathname)
      app.serveStatic(req, res, path)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

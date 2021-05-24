// 将应用预渲染为静态HTML。
// 运行“ yarn generate”，然后可以将“ dist static”用作静态站点。

const fs = require('fs')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = require('./dist/static/ssr-manifest.json')
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = require('./dist/server/server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
    .readdirSync(toAbsolute('src/pages'))
    .map((file) => {
        const name = file.replace(/\.vue$/, '').toLowerCase()
        return name === 'home' ? `/` : `/${name}`
    })

;(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const [appHtml, preloadLinks] = await render(url, manifest)

        const html = template
            .replace(`<!--preload-links-->`, preloadLinks)
            .replace(`<!--app-html-->`, appHtml)

        const filePath = `dist/static${url === '/' ? '/index' : url}.html`
        fs.writeFileSync(toAbsolute(filePath), html)
        console.log('pre-rendered:', filePath)
    }

    // done, delete ssr manifest
    fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()

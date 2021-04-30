/* eslint-disable */
/* @ts-ignore */

const serialize = require('serialize-javascript');
const path = require('path');
const express = require('express');
const fs = require('fs');
const {renderToString} = require('@vue/server-renderer');
const manifest = require('../dist/ssr-manifest.json');

// Create the express app.
const server = express();

// 我们不知道app.js的名称，因为它在构建时具有哈希名称
// 清单文件包含“ app.js”到创建的哈希文件的映射
// 因此，从位于“ dist”目录中的清单文件中获取值
// 并使用它来获取Vue应用

// @ts-ignore
const appPath = path.join(__dirname, '../dist', manifest['app.js']);
const createApp = require(appPath).default;

const clientDistPath = '../dist';

// @ts-ignore
server.use('/img', express.static(path.join(__dirname, clientDistPath, 'img')));
// @ts-ignore
server.use('/js', express.static(path.join(__dirname, clientDistPath, 'js')));
// @ts-ignore
server.use('/css', express.static(path.join(__dirname, clientDistPath, 'css')));
// @ts-ignore
server.use('/favicon.ico', express.static(path.join(__dirname, clientDistPath, 'favicon.ico')));

// 处理我们应用程序中的所有路线
// @ts-ignore
server.get('*', async (req, res) => {
    const {app, store} = await createApp(req.url);
    console.log(req.url)
    let appContent = await renderToString(app);

    const renderState = `
    <script>
      window.INITIAL_DATA = ${serialize(store.state)}
    </script>`;

    // @ts-ignore
    fs.readFile(path.join(__dirname, clientDistPath, 'index.html'), (err, html) => {
            if (err) {
                throw err;
            }
            appContent = `<div id="app">${appContent}</div>`;

            html = html.toString().replace('<div id="app"></div>',
                `${renderState}${appContent}`);
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`You can navigate to http://localhost:${port}`);
});

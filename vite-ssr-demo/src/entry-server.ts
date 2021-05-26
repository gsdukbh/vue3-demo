import {createApp} from './main'

import {renderToString} from '@vue/server-renderer'

// @ts-ignore
export async function render(url, manifest) {
    const {app, router, store} = createApp()

    // set the router to the desired URL before rendering
    await router.push(url)
    await router.isReady()

    // 传递将通过useSSRContext()获得的SSR上下文对象
    // @vitejs/plugin-vue将代码注入到组件的setup()中，该组件注册
    // 其本身位于ctx.module上。呈现之后，ctx.module将包含所有
    // 在此呈现调用期间实例化的组件。
    const ctx = {
        modules: undefined,
    };
    const html = await renderToString(app, ctx)

    // VITE生成的SSR清单包含模块->块/资产映射
    // 然后，我们可以使用它来确定需要为此预加载哪些文件
    // request.
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    return [html, preloadLinks]
}

// @ts-ignore
function renderPreloadLinks(modules, manifest) {
    let links = ''
    const seen = new Set()
    // @ts-ignore
    modules.forEach((id) => {
        const files = manifest[id]
        if (files) {
            // @ts-ignore
            files.forEach((file) => {
                if (!seen.has(file)) {
                    seen.add(file)
                    links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

function renderPreloadLink(file: string) {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    } else {
        // TODO
        return ''
    }
}

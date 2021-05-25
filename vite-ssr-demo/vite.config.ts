import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';

// import babel from 'vite-babel-plugin';

import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        vue(),
        viteCompression(),
        // babel(),
        styleImport({
            libs: [
                {
                    libraryName: 'ant-design-vue',
                    resolveStyle: name => {
                        return `ant-design-vue/es/${name}/style/index.less`;
                    }
                }
            ]
        })
    ]
})

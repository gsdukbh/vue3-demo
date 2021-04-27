const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const CompressionPlugin = require('compression-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionPlugin({
          // filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 1024, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 不删除原文件
        })
      );
    }
  },
  chainWebpack: (webpackConfig) => {
    webpackConfig.module.rule('vue').uses.delete('cache-loader');
    webpackConfig.module.rule('js').uses.delete('cache-loader');
    webpackConfig.module.rule('ts').uses.delete('cache-loader');
    webpackConfig.module.rule('tsx').uses.delete('cache-loader');

    if (!process.env.SSR) {
      // This is required for repl.it to play nicely with the Dev Server
      webpackConfig.devServer.disableHostCheck(true);

      webpackConfig.entry('app').clear().add('./src/main.ts');
      return;
    }
    webpackConfig.entry('app').clear().add('./src/main.server.ts');
    webpackConfig.target('node');

    webpackConfig.output.libraryTarget('commonjs2');
    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }));

    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

    webpackConfig.optimization.splitChunks(false).minimize(false);

    webpackConfig.plugins.delete('hmr');

    webpackConfig.plugins.delete('preload');
    webpackConfig.plugins.delete('prefetch');
    webpackConfig.plugins.delete('progress');
    webpackConfig.plugins.delete('friendly-errors');

    // console.log(webpackConfig.toConfig());
  },
};

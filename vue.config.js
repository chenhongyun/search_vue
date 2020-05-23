const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.ProvidePlugin({
      //   '$': 'jquery',
      //   'jQuery': 'jquery',
      //   'jquery': 'jquery',
      //   'window.jQuery': 'jquery'
      // })
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@utils', resolve('src/utils'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8080,
    proxy: {
      "/api":{
        target:"http://112.126.58.87:9200/movie/_doc",
        changeOrigin:true,
        pathRewrite:{
          "^/api":""
        }
      }
    }
    // proxy: {
    //   '/api':{
    //     target:'http://112.126.58.87:9200/movie/_doc/',
    //     changeOrigin:true, //是否跨域
    //     pathRewrite:{
    //       '^/api':'http://112.126.58.87:9200/movie/_doc/' //规定请求地址以什么作为开头
    //     }
    //   },
    //   '/pic': {
    //     target: 'http://i0.hdslb.com',
    //     // ws: true,
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   '^/pic': ''
    //     // }
    //   }
    // }
  },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

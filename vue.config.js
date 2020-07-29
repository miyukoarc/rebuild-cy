'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

console.log(process.env.VUE_APP_WORK, process.env.NODE_ENV)


const customizeDevServer = process.env.VUE_APP_WORK === 'offline' ? {
    port: 8085,
    open: true,
    overlay: {
        warnings: false,
        errors: true
    },

    disableHostCheck: true,
    proxy: {


        "/api": {
            headers: {
                host: '127.0.0.1:3000' //koa服务在3000端口运行
            },
            target: "http://localhost:8085", //与调试本地node server保持一致
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        }
    }

// 21days 
    // before: require('./mock/mock-server.js')
} : {
    port: 80,
    open: true,
    overlay: {
        warnings: false,
        errors: true
    },
    // host: 'www.sdk.com',
    disableHostCheck: true,
    proxy: {
        [process.env.VUE_APP_BASE_API]: {
            // target: 'http://47.111.161.128:9000/',
            // target: 'http://10.10.10.4:9000', // 光
            target: 'http://10.10.10.230', // 杜亮
            // target: 'http://10.10.10.198', // 骋昊
            // ws: true,
            changeOrigin: true,
            pathRewrite: {
                ['^' + process.env.VUE_APP_BASE_API]: ''
            }
        },
        // '/public': {
        //     target: 'http://10.10.10.172', // 杜亮

        //     // target: 'http://47.111.161.128:9000/',
        //     // target: 'http://10.10.10.198',
        //     changeOrigin: true,
        // },
        // "/api": {
        //   target: "http://localhost:80",
        //   secure: false,
        //   autoRewrite: true,
        //   pathRewrite: {
        //     "^/api": ""
        //   }
        // },
        [process.env.VUE_APP_BASE_API]: {
            headers: {
                Host: 'sidebar.cyscrm.com'
            },
            // target: 'http://47.111.161.128:9000/',
            // target: "http://10.10.10.198", //陈浩
            // target: "http://sidebar.cyscrm.com:9000"//线上
            target: "http://10.10.10.230", //杜亮
            //   target: 'http://10.10.10.4:9000', //光
            // target: "http://47.111.161.128:80",
            secure: false,
            // ws: true,
            pathRewrite: {
                "^/api": ""
            }
        },
        "/api": {
            headers: {
                Host: 'sidebar.cyscrm.com'
            },
            // target: 'http://47.111.161.128:9000/',
            // target: "http://10.10.10.198", //陈浩
            // target: "http://sidebar.cyscrm.com:9000"//线上
            target: "http://10.10.10.230", //杜亮
            // target: 'http://10.10.10.4:9000', //光
            // target: "http://47.111.161.128:80",
            secure: false,
            // ws: true,
            pathRewrite: {
                "^/api": ""
            }
        },
        '/file': {
            target: `http://192.168.1.198:9000/file`,
            changeOrigin: true,
            pathRewrite: {
                '^/file': '',
            },
        },
        // '/ws': {
        //     target: `http://47.111.161.128:80`,
        //     changeOrigin: true,
        //     ws: true,
        // }
    }



}


// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    //   process.env.NODE_ENV === 'development'
    productionSourceMap: true,
    devServer: customizeDevServer,
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        devtool: 'source-map'
    },

    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
        // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    },
    //   pluginOptions: {
    //     electronBuilder: {
    //       // List native deps here if they don't work
    //       externals: ['my-native-dep'],
    //       // If you are using Yarn Workspaces, you may have multiple node_modules folders
    //       // List them all here so that VCP Electron Builder can find them
    //       nodeModulesPath: ['../../node_modules', './node_modules']
    //     }
    //   }
}
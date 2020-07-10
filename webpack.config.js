const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
/**
 * HMR
 */
/**
 * 缓存
 * 1、babel缓存，设置cacheDirectory: true   ,提升第二次构建速度
 * 2、文件资源缓存  // 优化项目线上加载
 *      hash: 每次webpack构建时会生成一个唯一的hash值
 *          问题：如果重新打包，会导致缓存失效（可能我只改动了一个文件）
 *      chunkhash: 根据chunk生成的hash值，如果打包来源于同一个chunk，则hash值一样
 *          问题：js和css的hash值一样，因为同属一个chunk
 *      contenthash: 根据文件内容生成hash值，不同的文件，hash值不一样
 */
/**
 * tree shaking 去除无用代码
 * 前提: 必须使用es6模块化；开启production环境
 * 作用： 减少代码体积
 * 
 * 在packge.json中配置
 * "sideEffects": false 表示所有代码都没有副作用（都可以进行tree shaking）
 * 那么就会有可能把css文件干掉
 * 将配置改为 "sideEffects": ["*.css", "*.less"]
 */
// process.env.NODE_ENV = 'development'
const commonCssLoader = [
    // style-loader 创建<style></style>标签，将样式放入
    // 'style-loader',
    // 取代style-loader,提取js中的css成单独文件
    // MiniCssExtractPlugin.loader,
    {
        loader:MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'
        }

    },
    'css-loader',
    /**
     * css兼容性处理
     * 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
     */
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
            ]
        }
    },
]
module.exports = {
    /**
     * 1、string --> './src/entry/index.js'
     *  单入口，打包形成一个chunk，输出一个bundle文件，此时chunk的名称默认是main
     * 2、array --> ['./src/entry/index.js', './src/entry/test.js']
     *  多入口，所有文件最终只会形成一个chunk，输出一个bundle文件，只有在HMR功能中让html热更新有用
     * 3、object --> {main: './src/entry/index.js',test: './src/entry/test.js'}
     *  多入口，有几个入口文件就形成几个chunk，输出几个bundle文件，此时chunk名称是key
     */
    // entry: './src/entry/index.js',
    entry: {
        // 多入口，有一个入口，输出就有一个bundle
        index: ['./src/entry/index.js', './src/index.html'],
        research: './src/entry/furul-research.js',
    },
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径前缀，一般用于生产环境中，可以配置域名
        // publicPath: './',
        // 非入口chunk的名称
        chunkFilename: 'js/[name]_chunk.[contenthash:10].js'
    },
    module: {
        rules: [
            /**
             * 语法检查 eslint-loader eslint
             * 只检查自己的源代码
             * 在 package.json中的eslintConfig中设置检查规则
             * airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                /**
                 * 一般来讲，一个文件只能被一个loader处理，
                 * 当一个文件要被多个loader处理时，那么一定要指定loader的执行顺序
                 * 先执行eslint,再执行babel
                 */
                // 优先执行
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                /**
                 * 如果不用oneOf，则每个文件会被所有loader都执行一遍
                 * 以下loader只会匹配一个
                 * 注意：不能有两个配置处理同一种类型文件，所以将js的语法检查放在oneOf之外
                 */
                oneOf: [
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            esModule: false,
                            outputPath: 'imgs'
                        },
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[hash:10].[ext]',
                            outputPath: 'fonts'
                            // publicPath: './'
                        }
                    },
                    {
                        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'media/[hash:10].[ext]'
                        }
                    },
                    
                    
                    /**
                     * js兼容性处理： babel-loader @babel/preset-env @babel/core
                     * 1、@babel/preset-env 只能转换基本语法，如promise为能转换
                     * 2、全部js兼容性处理 --> @babel/polyfill, 体积太大
                     * 3、按需加载 --> core-js
                     */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            /**
                             * 开启多进程打包
                             * 进程启动大概为600ms，进程通信也有开销
                             * 只有工作消耗时间比较长，才需要多进程打包，项目大的时候再用
                             */
                            // 'thread-loader',
                            {
                                loader: 'babel-loader',
                                options: {
                                    // 预设：指示babel做怎么样的兼容性处理
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                // 按需加载
                                                useBuiltIns: 'usage',
                                                //指定core-js版本
                                                corejs: {
                                                    version: 3
                                                },
                                                // 指定兼容性做到哪个版本的浏览器
                                                targets: {
                                                    chrome: '60',
                                                    firefox: '60',
                                                    ie: '9',
                                                    safari: '10'
                                                }
                                            }
                                        ]
                                    ],
                                    /**
                                     * 开启babel缓存，提升构建速度
                                     * 第二次构建时，会读取之前的缓存
                                     */
                                    cacheDirectory: true
                                }
                            }
                        ]
                        
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            // 压缩处理
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            },
            chunks: ['vendors', 'index']
        }),
        new HtmlWebpackPlugin({
            filename: 'furul-research.html',
            template: './src/furul-research.html',
            // 压缩处理
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            },
            chunks: ['vendors', 'research']
        }),
        // 提取css
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:10].css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     "$": "jquery",
        //     "jQuery": "jquery",
        //     "window.jQuery": "jquery"
        // })
    ],
    // 生产环境会自动压缩js
    mode: 'production',
    // mode: 'development',
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        // 监视目录下所有文件，一旦文件变化就会reload
        watchContentBase: true,
        watchOptions: {
            // 不需要监视的目录
            ignored: /node_modules/
        },
        compress: true,
        port: 3000,
        open: true,
        // hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息外，其它内容都不要显示
        quiet: true,
        // 如果出错，不要全屏提示
        overlay: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写，将 /api/xxx --> /xx (去掉/api)
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    /**
     * source-map: 一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）
     * source-map 外部  错误代码准确信息 和 源代码的错误位置
     * inline-source-map 内联 只生成一个内联source-map 错误代码准确信息 和 源代码的错误位置
     * hidden-source-map 外部 错误代码错误原因，但没有错误位置
     * eval-source-map 内联
     * cheap-source-map 外部 只能精确到行 错误代码准确信息 和 源代码的错误位置
     * 外部会生成一个文件，内联不会
     * 速度 eval>inline>cheap
     */
    devtool: 'source-map',
    /**
     * 可以将node_modules中代码单独打包成一个chunk最终输出
     * 自动分析多入口chunk中，有没有公共的文件，如果有，会打包成单独一个chunk,而不是打包成多个
     */
    optimization: {
        splitChunks: {
            chunks: 'all',
            // 分割的chunk最小为30kb
            // 以下为默认值
            // minSize: 30 * 1024,
            // maxSize: 0, // 最大没有限制
            // minChunks: 1, // 要提取的chunk最少被引用1次
            // maxAsynRequests: 5, // 近需加载时并行加载的文件的最大数量
            // maxInitialRequests: 3, // 入口js文件最大并行请求数量
            // automaticNameDelimiter: '~', // 名称连接符
            // name: true, // 可以使用命名规则
        },
        // 将当前模块的记录其它模块的hash单独打包为一个文件
        // 解决  修改a文件导致b文件的hash变化 
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        }
    },
    externals: {
        // jquery不会被打包进项目，但需要在html中手动引入 
        jquery: 'jQuery'
    },
    // 解析模块的规则
    resolve: {
        // 配置省略文件路径的后缀名
        extensions: ['.js', '.json'],
        // 配置解析模块路径别名
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 告诉webpack解析模块是去找哪个目录
        modules: [resolve(__dirname, './node_modules')]
    }
}
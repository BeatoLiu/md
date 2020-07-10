
+ ``` webpack ./src/index.js -o ./build/built.js --mode=development ``` // 最原始写法

## loader
+ css兼容性处理 postcss --> postcss-loader(loader) post-preset-env(插件)
    - 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
    - ```   
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: () => [
                        // postcss的插件
                        require('postcss-preset-env')()
                    ]
                }
            }
        ```
+ js兼容性处理： babel-loader @babel/preset-env @babel/core
    - @babel/preset-env 只能转换基本语法，如promise为能转换
    - 全部js兼容性处理 --> @babel/polyfill, 体积太大
    - 按需加载 --> core-js
 ```
    {
        test: /\.js$/,
        exclude: /node_modules/,
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
            ]
        }
    }
 ```
## plugin
+ html-webpack-plugin
+ mini-css-extract-plugin  提取css成单独文件
+ optimize-css-assets-webpack-plugin 压缩css
+ 语法检查 eslint-loader eslint
    - 只检查自己的源代码
    - 在 package.json中的eslintConfig中设置检查规则 "eslintConfig": {
      "extends": "airbnb-base"
  }
    - airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
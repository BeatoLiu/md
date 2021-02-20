## 启动简易本地服务
yarn global add serve
serve ./dist



## node特点
+ 事件驱动
+ 非阻塞IO模型（异步）
+ 轻量和高效
## 导入导出
+ 在没有任何内容导出的情况下获取某个文件的内容，会得到一个空对象
+ module.exports是默认导出对象,系统设置了exports=module.exports,两者都设置了的话，取module.exports
+ 使用exports时，只能单个设置属性exports.a = a;
+ 使用module.exports时可以单个设置属性，也可以整个赋值module.exports = {a,b}
+ 模块仅在第一次被使用（即引入）时执行一次
+ require(‘第三方包名’) 优先在加载该包的模块的同级目录node_modules中查找第三方包
  - 找到该第三方包中的package.json文件，并且找到里面的main属性对应的入口模块
  - 如果没有main属性，则默认将index.js作为入口模块
  - 如果同级中没有node_modules文件，则逐级向上查找，直到根目录

## 文件系统
+ 函数有同步异步之分，不建议使用同步函数，同步函数是阻塞的，影响效率
+ 关于参数flag: w=>write, a=>append, r=>read
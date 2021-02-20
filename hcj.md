## html


## css
+ 选择器
    - 属性选择器 [属性名] 或 [属性名=属性值]
    - 子元素 .parent>div 直接子元素div; .parent div 所有后代div
    - .subling+div 紧跟在subling后面的兄弟div；.subling~div subling后面的所有兄弟div

+ 行块元素inline-block间距问题(如：``` <div>
    <img>
    <img>
    <img></div> ```中的img会有间隔 )
    - 可以设置字体 font-size:0
    - 可以用float
+ 滤镜 filter
    -  如设置灰度 grayscale(1) 1是百分之百，0是百分之0 
    - 亮度 brightness(1) 1正常亮度 2是200%
    - 褐色 sepia(1)给人一种老照片的感觉， 1是百分百，0是正常
    - 模糊度 blur(5px),值越高越模糊
    - 对比度 contrast()
    - 饱和度 saturate()
    - 色相的旋转hue-rotate(180deg)
+ 过渡 transition
    - transition-property: width, background   过渡的属性如width,可设置多个，默认all
    - transition-duration: 2s   过渡效果持续2S,可设置多个值，会对应transition-property
    - transition-delay: 2s     过渡等待两秒后再执行
    - transition-timing-function: ease   过渡变化的速度

+ 变形transform
    - translate(x,y) 移动
    - rotate(30deg) 旋转 rotateX():绕x轴旋转，需要父级元素加perspective: 100px 属性，才有立体效果
+ 动画animation
    - animation-name
    - animation-duration
    - animation-timing-function
    - animation-delay
    - animation-iteration-count:infinite 无限循环，也可以是具体数字代表执行次数
    - animation-direction 运动方向，normal正常,alternate来回往返运动，reverse反方向
    - animation-fill-mode:forwards  使得动画保持最后一帧效果

+ 弹性布局 flex
    - flex-direction 主轴方向，row是默认值，column、row-reverse、column-reverse
    - justify-content 设置主轴内容分布
        - flex-start 向主轴开始方向的排列（默认）
        - center 向主轴的中心排列
        - flex-end 向主轴的结束位置排列
        - space-around  平局分布，两边有间距，两边间距是中间的一半
        - space-between 平均分布，两边没有间距
        - space-evenly(新) 平均分布，两边间距和中间的一样
    - align-items 设置侧轴内容分布(单行)
        - flex-start 向侧轴的起始位置排列
        - center 向侧轴的中心位置排列
        - flex-end 向侧轴的结束位置排列
        - stretch 拉伸（默认），如果子元素设置了侧轴方向的高（宽）度，则无效
    - flex-wrap 换行，wrap, nowrap(默认)
    - align-content 设置侧轴的内容分布（多行）,如果同时设置了align-items,取align-content
        - flex-start 向主轴开始方向的排列（默认）
        - center 向主轴的中心排列
        - flex-end 向主轴的结束位置排列
        - space-around  平局分布，两边有间距，两边间距是中间的一半
        - space-between 平均分布，两边没有间距
        - space-evenly(新) 平均分布，两边间距和中间的一样
    - align-self 单独给某个子元素设置侧轴排列center, flex-start, flex-end, stretch
+ 盒子的大小模型设定：box-sizing
    - content-box(默认值) 当内容的大小是固定的情况下，那么用content-box
    - border-box 当希望整个盒子大小是固定的，不会因为设置了内边距和boder而撑开改变大小

## js
+ this
    - 谁调用，指向谁
        ```
        var te = {
            name: 'te1',
            like: function(){
                console.log(this) // te 定义时已经确定
                console.log(this.name) // te1
            }
        }
        ```
    - 箭头函数(不遵循谁调用，指向谁的规则)，继承外层函数调用的this指向
        ```
        var st = {
            name: 'st1',
            like: () => {
                console.log(this) // window (定义时已经确定), 没有外层函数调用，所以是window
                console.log(this.name) // ''
            }
        }
        ```

+ Ajax
    ```
        // 1、创建xhr对象
        var xhr = new XMLHttpRequest()
        // 2、设置请求方式和路径
        xhr.open('POST', url)
        // 3、发送数据
        xhr.send(params)
    ```


## DOM
+ 获取元素
    - ``` document.getElementsByTagName('div') // 得到一个类数组 ```
    - ``` document.getElementById('idName') // 得到id=idName的元素 ```
    - ``` document.getElementsByClassName('className') // 得到一个类数组```
    - ``` document.querySelector('.abc') // 参数为css选择器，返回匹配到的第一个元素``` 
    - ``` document.querySelectorAll('.abc') // 返回所有匹配到的元素 ```
+ 关系结点的获取
    - 父结点 parentNode
    - 兄弟结点 nextSibling、nextElementSibling(标签)、previousSibling、previousElementSibling(标签)
    - 子结点 firstChild、firstElementChild(标签)、lastChild、lastElementChild(标签)
    - 所有子节点 childNodes、children(标签)

+ 节点的创建追加插入删除
    ```
    var img = document.createElement('img') // 创建img元素
    var body = document.querySeletor('body')
    var d3 = document.querySeletor('.d3')

    body.appendChild(img) // 在body中追加img
    body.insertBefore(img,d3) // 在d3前面插入img
    body.removeChild(d3) // 删除d3

    // 如果将同一个元素插入到多个地方，则只有最后一次操作有效，若想都生效，可用cloneNode方法复制该元素
    var img2 = img.cloneNode() // 复制img元素, cloneNode(true)  如果传入参数，则表示子节点也会复制
    ```
+ 获取元素内容
    - innerHtml 取出标签内所有内容
    - innerText 取出所有文本 不含标签
    - outerHtml 取出所有内容（含元素本身）
+ 操作元素的类
    ```
    var d1 = document.getElementById('d1')
    d1.className='redBg bigFont' // 赋值
    d1.classList.add('shadow') // 追加
    d1.classList.replace('bigFont', 'smallFont') // 替换
    d1.classList.remove('redBg') // 移除
    ```

+ offset
    - 1、offsetWidth 和 offsetHeight
        用于检测盒子自身的“宽高+padding+border”，不包括margin
        - offsetWidth = width + padding + border
        - offsetHeight = height + padding + border
    - 2、offsetLeft 和 offsetTop （只读，不可写）
        盒子到有定位的父元素的距离，如果都没有定位，则表示到根元素的距离
        注：如果有定位的祖先元素是body,则会加上body的边框（如果body设置了边框的话）
    - 3、offsetParent 最近的有定位的祖先元素

+ scroll
    - 1、scrollWidth 和 scrollHeight
        获取盒子内部的宽高，不包括border和margin
        - scrollWidth = width + padding
        - scrollHeight = height + padding
        注：scrollHeight，如果内容超出了盒子，则高度为内容的高度

    - 2、scrollTo() 和 scrollBy()
     - scrollTo(0, 1000) 滚动条向下滚动1000
     - scrollBy(0, 1000) 滚动条在现有的位置上再向下滚动1000

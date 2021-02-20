+ 1、安装脚手架 create-react-app
    - cnpm install -g create-react-app
+ 2、创建项目
    - create-react-app prj



+ 3、生命周期
    - 生命周期即是组件从实例化到渲染到最终从页面中销毁，整个过程就是生命周期，在这生命周期中，我们有许多可以调用的事件，也俗称为钩子函数

    - 生命周期的3个状态：
        - Mounting: 将组件插入到dom中
        - updating: 将数据更新到dom中
        - ummounting: 将组件移除dom中
    - 生命周期中的函数
        - UNSAFE_componentWillMount: 组件将要渲染
        - ComponentDidMount: 组件渲染完毕
        - UNSAFE_componentWillReceiveProps: 组件将要接受props数据
        - ShouldComponentUpdate: 组件接收到新的state或者props，判断是否更新，返回布尔值
        - UNSAFE_componentWillUpdate: 组件将要更新
        - ComponentDidUpdate: 组件已经更新
        - ComponentWillUnmount: 组件将要卸载

+ 4、表单输入
    - 需要绑定value和onChange事件


+ 5、路由
    - yarn add react-router-dom --save
    - https://reactrouter.com/web/api/Link/to-object  文档地址
    ```
    <Router>
        {/* Switch 表示只加载一个路由 */}
        <Switch>
            <Route exact path="/" component={ Home }></Route>
            {/* strict exact 精准匹配 */}
            <Route strict exact path="/mine" component={ Mine }></Route>
            <Route path="/mine/center" component={ MineCenter }></Route>
            <Route component={NotFound}></Route>
        </Switch>
        <ul>
            <li>
                {/* NavLink 会给选中的路由加一个默认的class="active" ,或者用activeClassName="otherName"*/}
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <Link to="/mine">Mine</Link>
            </li>
            <li>
                <Link to="/mine/center">Center</Link>
            </li>
        </ul>
    </Router>
    ```
+ 6、默认支持sass，只需要安装 npm install --save-dev node-sass  便可使用

+ redux
    - 安装
    ``` yarn add redux
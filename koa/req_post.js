const Koa = require('koa')
const app = new Koa()

//处理post请求的中间件
const bodyparser = require('koa-bodyparser')

app.use(bodyparser())

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        let html = `
            <h1>Request Post</h1>
            <form method="POST" action="/">
                <p>username</p>
                <input name="username" /><br />
                <p>age</p>
                <input name="age" /><br />
                <p>website</p>
                <input name="website" /><br />
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html
    } else if(ctx.url === '/' && ctx.method === 'POST'){
        // let postData = await parsePostData(ctx)
        let postData = ctx.request.body
        ctx.body = postData
    }else{

    }
})

// 获取post请求参数
function parsePostData(ctx){
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.addListener('data', data => {
                postData += data
            })
            ctx.req.on('end', () => {
                resolve(postData)
            })
        } catch (error) {
            reject(error)
        }
    })
}
app.listen(3000, () => {console.log('app is staring...')})
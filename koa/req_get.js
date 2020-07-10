const Koa = require('koa')

const app = new Koa();

app.use(async (ctx) => {
    let url = ctx.url
    let req = ctx.request
    let req_query = req.query
    let req_querystring = req.querystring

    ctx.body = {
        ctx,
        req,
        req_query,
        req_querystring
    }
})

app.listen(3000, () => {console.log('server is starting...')})
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// 自动解析body请求体，将解析后的参数保存在 ctx.request.body 中，如果没有传请求参数，存入空对象
// 只能解析Body中的内容，在url中params不能解析
app.use(bodyParser());

//
app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
})

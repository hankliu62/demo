const Koa = require('Koa');
const app = new Koa();

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
});
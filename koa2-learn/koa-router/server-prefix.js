const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({
  prefix: '/user',
});

app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx) => {
  ctx.body = 'user info';
}).get('/name', async (ctx) => {
  ctx.body = 'user name';
}).get('/age', async (ctx) => {
  ctx.body = 'user age';
});

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});
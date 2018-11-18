const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(router.routes()).use(router.allowedMethods());

function render(page) {
  return new Promise((resolve, reject) => {
    const pagePath = `./koa-router/view/${page}`;
    let html;
    try {
      html = fs.readFileSync(pagePath, 'binary');
      resolve(html);
    } catch (error) {
      reject(error);
    }
  })
}

router.get('/', async (ctx) => {
  const html = await render('index.html');
  ctx.body = html;
}).get('/index', async (ctx) => {
  const html = await render('index.html');
  ctx.body = html;
}).get('/todo', async (ctx) => {
  const html = await render('todo.html');
  ctx.body = html;
}).get('/404', async (ctx) => {
  const html = await render('404.html');
  ctx.body = html;
});

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});
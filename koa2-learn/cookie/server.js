const Koa = require('koa');

const app = new Koa();
const CookieName = 'koa/index';

app.use((ctx) => {
  if (ctx.request.url === '/index') {
    ctx.cookies.set(CookieName, new Date().valueOf(), {
      domain: ctx.request.domain, // 写cookie所在的域名
      path: '/',       // 写cookie所在的路径
      // path: '/index',       // 写cookie所在的路径
      maxAge: 1000 * 60 * 60 * 24,   // cookie有效时长
      expires: new Date('2018-12-31'), // cookie失效时间 以 maxAge 和 expires 最近的时间为准
      httpOnly: false,  // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写
    });
    ctx.body = 'cookie is ok';
  } else {
    const cookieValue = ctx.cookies.get(CookieName)
    if (cookieValue) {
      ctx.body = cookieValue;
    } else {
      ctx.body = 'cookie is gone';
    }
  }
});

app.listen(3000, () => {
  console.log('[demo] server is starting port 3000')
});
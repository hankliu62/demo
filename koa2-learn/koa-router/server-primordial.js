const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

function render2(page) {
  return new Promise((resolve, reject) => {
      let pageUrl = `./koa-router/view/${page}`;
     // binary  二进制
      fs.readFile(pageUrl, 'binary', (err, data) => {
          if(err){
              reject(err);
          }else {
              resolve(data);
          }
      })
  })
}

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

async function router(url) {
  let page = '';
  switch (url) {
    case '/' : {
      page = 'index.html';
      break;
    }
    case '/index' : {
      page = 'index.html';
      break;
    }
    case '/todo' : {
      page = 'todo.html';
      break;
    }
    case '/404' : {
      page = '404.html';
      break;
    }
    default: {
      page = '404.html';
    }
  }

  const html = await render(page);
  return html;
}

app.use(async (ctx) => {
  const url = ctx.request.url;
  const html = await router(url);

  ctx.body = html;
})

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});
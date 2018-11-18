const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name, file) => { // 文件上传前的设置
      console.log(`upload file name: ${name}`);
      // console.log(file);
    },
  }
}));

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  if (ctx.request.body) {
    ctx.body = ctx.request.body;
  } else if (ctx.request.files) {
    ctx.body = { message: 'ok' };
  }
});

app.listen(3001, () => {
  console.log('[demo] server is starting at port 3000');
})
const path = require('path');
const Koa = require('koa');
const statics = require('koa-static');

const app = new Koa();

app.use(statics(path.join(__dirname, 'static')))

app.listen(3001, () => {
  console.log('[demo] server is starting at port 3000');
});
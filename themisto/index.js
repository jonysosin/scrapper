const router = require('koa-route');
const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const controller = require('./src/controller');
let app = new koa();

app.use(bodyparser());
app.use(router.get("/api/scrap", controller.scrap));

if (!module.parent) {
  app.listen(4000);
}
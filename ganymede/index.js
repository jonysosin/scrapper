const router = require('koa-route');
const mount = require('koa-mount');
const auth = require('koa-basic-auth');
const koa = require('koa');
const config = require('config');
const bodyparser = require('koa-bodyparser');
const controller = require('./src/controller');

let app = new koa();
app.use(bodyparser());

app.use(router.post("/api/product/search", controller.productSearch));
app.use(router.get("/api/product/search-order/list", controller.productOrderList));
app.use(router.get("/api/product/search-order/:searchOrderId", controller.productSearchByID));
app.use(router.get("/api/product/category/:productCategoryId", controller.productCategoryID));

// Private Endpoint
app.use(mount("/api/product/callback-scrapper", auth({ name: config.Credentials.username, pass: config.Credentials.password })));
app.use(router.post("/api/product/callback-scrapper", controller.callbackScrapper));

if (!module.parent) {
  app.listen(3131);
  console.log("Listening on port 3131.");
}
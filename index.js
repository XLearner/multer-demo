import Koa from "koa";
import KoaStatic from "koa-static";
import path from "path";
import router from "./router.js";

const dirname = path.resolve();
const app = new Koa();
app.use(KoaStatic(dirname + "/assets"));

// response
app.use(async (ctx, next) => {
  const origin = ctx.request.header.origin;
  ctx.set("Access-Control-Allow-Origin", origin);
  ctx.set(
    "Access-Control-Allow-Headers",
    "zhtoken, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(router);
app.listen(8903);
console.log("success running server: http://localhost:8903");

import Koa, { BaseContext } from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import helmet from "koa-helmet"

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 5000;

app.use(helmet.contentSecurityPolicy({
  directives:{
    defaultSrc:["'self'"],
    scriptSrc:["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
    styleSrc:["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
    fontSrc:["'self'","fonts.gstatic.com"],
    imgSrc:["'self'", "data:", "online.swagger.io", "validator.swagger.io"]
  }
}));

app.use(cors());

router.get("/", async (ctx: BaseContext): Promise<void> => {
  ctx.body = "Hello World";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});

import Koa, { BaseContext } from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import { whitelistMiddleware } from "./middleware/whitelist";
import env from "./config/env";

const app = new Koa();
const router = new Router();
const port = env.PORT;

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "cdnjs.cloudflare.com",
        "fonts.googleapis.com",
      ],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "online.swagger.io", "validator.swagger.io"],
    },
  })
);

app.use(cors());
app.use(whitelistMiddleware)

router.get("/hello", async (ctx: BaseContext): Promise<void> => {
  ctx.body = "Hello World";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

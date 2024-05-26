import { BaseContext, Next } from "koa";
import env from "../config/env";

export const whitelistMiddleware = async (
  ctx: BaseContext,
  next: Next
): Promise<void> => {
  if (env.isDev) {
    return await next();
  }

  const origin = ctx.origin;
  const allowedOrigins = env.ALLOWED_DOMAINS.split(",");
  if (!!env.ALLOWED_DOMAINS && allowedOrigins.includes(origin)) {
    next();
  } else {
    ctx.status = 403;
    ctx.body = origin + " not allowed";
  }
};

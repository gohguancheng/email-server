import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "production",
    choices: ["development", "production"],
  }),
  ALLOWED_DOMAINS: str({ default: "" }),
  PORT: port({ default: 5000 }),
  MONGO_URI: str(),
});

export default env;

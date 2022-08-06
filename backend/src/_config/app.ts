import AppConfig from "../@types/env/config/AppConfig";

export default {
  WEB_URL: process.env.WEB_URL,
  PYTHON_URL: process.env.PYTHON_URL,
  NODE_ENV: process.env.NODE_ENV,
  APP_SECRET: process.env.APP_SECRET,
  PORT: process.env.PORT,
  CREATE_USER_ENABLED: process.env.CREATE_USER_ENABLED,
} as AppConfig;

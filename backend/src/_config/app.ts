import AppConfig from "../@types/env/config/AppConfig";

export default {
  WEB_URL: process.env.WEB_URL,
  PYTHON_URL: process.env.PYTHON_URL,
  NODE_ENV: process.env.NODE_ENV,
  APP_SECRET: process.env.APP_SECRET,
  DEVELOPMENT_PORT: process.env.DEVELOPMENT_PORT,
  PRODUCTION_PORT: process.env.PRODUCTION_PORT,
  CREATE_USER_ENABLED: process.env.CREATE_USER_ENABLED,
} as AppConfig;

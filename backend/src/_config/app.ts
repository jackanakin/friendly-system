import AppConfig from "../@types/env/AppConfig";

export default {
  WEB_URL: process.env.WEB_URL,
  PYTHON_URL: process.env.PYTHON_URL,
  NODE_ENV: process.env.NODE_ENV,
  APP_SECRET: process.env.APP_SECRET,
  DEVELOPMENT_PORT: process.env.DEVELOPMENT_PORT,
} as AppConfig;

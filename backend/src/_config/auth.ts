import AuthConfig from "../@types/env/config/AuthConfig";

export default {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
} as AuthConfig;
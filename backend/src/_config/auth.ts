import AuthConfig from "../@types/env/AuthConfig";

export default {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
} as AuthConfig;
import { TrueFalseEnum } from "../../../_config/@enum/TrueFalseEnum";

export default interface AppConfig {
    WEB_URL: string;
    PYTHON_URL: string;
    NODE_ENV: string;
    APP_SECRET: string;
    DEVELOPMENT_PORT: string;
    PRODUCTION_PORT: string;
    CREATE_USER_ENABLED: TrueFalseEnum;
}
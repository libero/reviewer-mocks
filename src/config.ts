export interface ConfigType {
    port?: number;
    continuumLoginRedirectUrl: string;
    continuumLoginJwtSecret?: string;
    continuumAuthJwtSecret?: string;
    continuumAuthRedirectUrl?: string;
}

const config: ConfigType = {
    port: Number(process.env.PORT) || 3001,
    continuumLoginRedirectUrl:
        process.env.CONTINUUM_LOGIN_REDIRECT_URL || `http://localhost:${Number(process.env.PORT) || 3001}/authenticate`,
    continuumLoginJwtSecret: process.env.CONTINUUM_LOGIN_JWT_SECRET,
    continuumAuthJwtSecret: process.env.CONTINUUM_AUTH_JWT_SECRET,
    continuumAuthRedirectUrl: process.env.CONTINUUM_AUTH_REDIRECT_URL,
};

export default config;

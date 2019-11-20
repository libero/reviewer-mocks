export interface ConfigType {
    port?: number;
    authenticationUrl: string;
    continuumLoginJwtSecret?: string;
}

const config: ConfigType = {
    port: Number(process.env.CONTINUUM_LOGIN_PORT) || 3001,
    authenticationUrl: `${process.env.AUTHENTICATION_URL}`,
    continuumLoginJwtSecret: process.env.CONTINUUM_LOGIN_JWT_SECRET,
};

export default config;

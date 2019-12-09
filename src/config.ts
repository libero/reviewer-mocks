import { readFileSync } from 'fs';

export interface ConfigType {
    port: number;
    login_return_url: string;
    continuum_jwt_secret: string;
    continuum_return_url: string;
    authentication_jwt_secret: string;
}

const configPath = process.env.CONFIG_PATH ? process.env.CONFIG_PATH : '/etc/reviewer/config.json';
const config: ConfigType = JSON.parse(readFileSync(configPath, 'utf8'));

export default config;

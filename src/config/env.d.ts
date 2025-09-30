// TypeScript declarations for env.js

export interface Config {
  API_BASE: string;
  ADMIN_TOKEN: string;
  BRAND_NAME: string;
  WEBSITE_URL: string;
  INSTAGRAM_URL: string;
  PRIMARY_COLOR: string;
  SECONDARY_COLOR: string;
}

export declare const config: Config;
export declare function validateConfig(): boolean;
export declare function logConfig(): void;

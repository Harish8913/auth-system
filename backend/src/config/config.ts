interface ServerConfig {
  port: number;
  nodeEnv: string;
}

interface AppConfig {
  server: ServerConfig;
}

export const config: AppConfig = {
  server: { 
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
  }
};
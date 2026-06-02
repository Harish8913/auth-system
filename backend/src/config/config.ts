import dotenv from "dotenv";
dotenv.config();

interface ServerConfig {
  port: number;
  nodeEnv: string;
}

interface DbConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

interface AppConfig {
  server: ServerConfig;
  db: DbConfig;
}

const requireEnv = (name: string): string => {
  const value = process.env[name];
  console.log(name, value);
  if (!value) throw new Error(`Missing Environment Variable: ${name}`);
  return value;
};

export const config: AppConfig = {
  server: {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
  },

  db: {
    user: requireEnv("DB_USER"),
    host: requireEnv("DB_HOST"),
    database: requireEnv("DB_NAME"),
    password: requireEnv("DB_PASSWORD"),
    port: parseInt(process.env.DB_PORT || "5432", 10),
  },
};
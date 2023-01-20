import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 5000;

export const MYSQL_CONFIG = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: +process.env.port,
};

export const jwtSecret = process.env.JWT_SECRET;

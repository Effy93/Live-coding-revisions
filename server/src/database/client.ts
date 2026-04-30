import mysql from "mysql2/promise";
import type { Pool, PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const config: PoolOptions = {
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "livecoUser",
   password: process.env.DB_PASSWORD || "123",
   database: process.env.DB_NAME || "liveDB",
   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

export const db: Pool = mysql.createPool(config);

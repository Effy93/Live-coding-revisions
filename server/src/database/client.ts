import mysql from "mysql2/promise";
import type { Pool, PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const config: PoolOptions = {
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   password: process.env.DB_PASSWORD || "Tolteque42",
   database: process.env.DB_NAME || "livecoDB",
   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

export const db: Pool = mysql.createPool(config);

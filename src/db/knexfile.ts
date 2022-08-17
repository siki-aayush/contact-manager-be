import dotenv from "dotenv";
import type { Knex } from "knex";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const config: { [kkjkey: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;

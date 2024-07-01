import { Sequelize } from "sequelize";

const {
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  POSTGRES_DB_USER,
  POSTGRES_DB_PASSWORD,
  POSTGRES_DB_NAME,
  NODE_ENV,
} = process.env;

/**
 * Create a new instance of Sequelize
 */
const sequelize = new Sequelize({
  dialect: "postgres",
  host: POSTGRES_DB_HOST,
  port: POSTGRES_DB_PORT as unknown as number,
  database: POSTGRES_DB_NAME,
  username: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASSWORD,
  logging: NODE_ENV === "development" ? console.log : false,
});

export { sequelize };

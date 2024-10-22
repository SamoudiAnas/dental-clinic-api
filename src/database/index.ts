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
const sequelize = new Sequelize(process.env.DATABASE_PUBLIC_URL, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});
export { sequelize };

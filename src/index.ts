/**
 * Load environment variables
 */
import { config } from "dotenv";
config();

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { sequelize } from "./database";
import { authRoutes, userRoutes, appointmentRoutes } from "./routes";

/**
 * Application port
 */
const port = process.env.PORT || 5000;

/**
 * Create an express application
 */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Define the routes
 */

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

/**
 * Start the express server
 */
const start = async (): Promise<void> => {
  try {
    /**
     * Sync the database
     */

    await sequelize.authenticate();
    await sequelize.sync().then(async () => {
      console.log("Database synced");
    });

    /**
     * Start the server
     */
    app.listen(port, async () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

void start();

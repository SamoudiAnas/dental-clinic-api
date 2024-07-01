import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export { router as userRoutes };

import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  resetPassword,
  updateUser,
} from "../controllers/";
import { authorizeToken } from "../middlewares/authorize-token";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/update", authorizeToken, updateUser);
router.put("/password-reset", authorizeToken, resetPassword);

export { router as userRoutes };

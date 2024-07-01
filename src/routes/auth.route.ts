import { Router } from "express";
import { checkUser } from "../middlewares/auth";
import { createAccount, login } from "../controllers/";

const router = Router();

router.post("/create-account", checkUser, createAccount);
router.post("/login", login);

export { router as authRoutes };

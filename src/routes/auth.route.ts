import { Router } from "express";
import { checkUser } from "../middlewares/check-user";
import { createAccount, login } from "../controllers/";

const router = Router();

router.post("/create-account", checkUser, createAccount);
router.post("/login", login);

export { router as authRoutes };

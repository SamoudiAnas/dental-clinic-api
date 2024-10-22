import { Router } from "express";
import { checkUser } from "../middlewares/check-user";
import { createAccount, getUser, login } from "../controllers/";
import { authorizeToken } from "../middlewares/authorize-token";

const router = Router();

router.post("/create-account", checkUser, createAccount);
router.post("/login", login);
router.get("/user", authorizeToken, getUser);

export { router as authRoutes };

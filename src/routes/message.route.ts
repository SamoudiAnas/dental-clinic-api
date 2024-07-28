import { Router } from "express";
import { createMessage } from "../controllers/contact.controller";

const router = Router();

router.post("/", createMessage);

export { router as messageRouter };

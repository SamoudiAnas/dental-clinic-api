import { Router } from "express";
import {
  addUserAsAdmin,
  removeAdminPrivileges,
} from "../controllers/admin.controller";

const router = Router();

router.post("/add", addUserAsAdmin);
router.post("/remove", removeAdminPrivileges);

export { router as adminRoutes };

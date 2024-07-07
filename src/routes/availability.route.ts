import { Router } from "express";
import { getAvailability, getAvailabilityByDate } from "../controllers/";
import { authorizeToken } from "../middlewares/authorize-token";

const router = Router();

router.get("/", authorizeToken, getAvailability);
router.get("/:date", getAvailabilityByDate);

export { router as availabilityRouter };

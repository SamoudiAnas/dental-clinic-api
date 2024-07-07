import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  getUserAppointments,
  updateAppointment,
} from "../controllers";
import { authorizeToken } from "../middlewares/authorize-token";

const router = Router();

router.get("/", authorizeToken, getAllAppointments);
router.get("/user", authorizeToken, getUserAppointments);
router.get("/:id", authorizeToken, getAppointmentById);
router.post("/create", authorizeToken, createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export { router as appointmentRoutes };

import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
} from "../controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/create", verifyToken, createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export { router as appointmentRoutes };

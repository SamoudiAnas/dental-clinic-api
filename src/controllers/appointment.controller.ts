import { Request, Response } from "express";
import {
  ERROR_INTERNAL_SERVER,
  STATUS_CREATED,
  STATUS_OK,
} from "../constants/http-status";
import {
  Appointment,
  AppointmentCreationAttributes,
} from "../models/appointment.model";
import { checkIfDateIsInWeekend } from "../utils/date";

/**
 * POST - appointments/create
 * creates a new appointment
 */
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { date, duration } = req.body as AppointmentCreationAttributes;

    const userId = req["userId"];
    console.log(userId);

    /**
     * Validate the data
     */

    if (!date || !duration || !userId) {
      return res.status(ERROR_INTERNAL_SERVER).json({ error: "Missing data" });
    }

    /**
     * Check if the date is in the weekend
     */
    if (checkIfDateIsInWeekend(new Date(date))) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Appointments cannot be created on weekends" });
    }

    /**
     * Check availability
     */
    const appointment = await Appointment.findOne({
      where: { date },
    });

    if (appointment) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Appointment on this date already exists" });
    }

    /**
     * Create the appointment
     */
    const result = await Appointment.create({
      date,
      duration,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    /**
     * If the appointment is not created, return an error
     */
    if (!result) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Error creating appointment" });
    }

    res.status(STATUS_CREATED).json({ appointment: result });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error creating appointment" });
  }
};

/**
 * PUT - appointments/:id
 * updates an appointment by id
 */
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { date, duration } = req.body as AppointmentCreationAttributes;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Appointment not found" });
    }

    /**
     * Check if the date is in the weekend
     */
    if (checkIfDateIsInWeekend(new Date(date))) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Appointments cannot be created on weekends" });
    }

    /**
     * Check availability
     */
    const appointmentExists = await Appointment.findOne({
      where: { date },
    });

    if (appointmentExists && appointmentExists.id !== id) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Appointment on this date already exists" });
    }

    appointment.date = date;
    appointment.duration = duration;
    appointment.updatedAt = new Date();

    await appointment.save();

    return res.status(STATUS_OK).json({ appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error updating appointment" });
  }
};

/**
 * GET - appointments/:id
 * returns an appointment by id
 */
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await Appointment.findByPk(id);
    res.status(STATUS_OK).json({ appointment: result });
  } catch (error) {
    console.error("Error getting appointment by id:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error getting appointment by id" });
  }
};

/**
 * GET - appointments
 * returns all appointments
 */
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const result = await Appointment.findAll();
    res.status(STATUS_OK).json({ appointments: result });
  } catch (error) {
    console.error("Error getting appointments:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error getting appointments" });
  }
};

/**
 * DELETE - appointments/:id
 * deletes an appointment by id
 */
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Appointment not found" });
    }

    await appointment.destroy();

    res.status(STATUS_OK).json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error deleting appointment" });
  }
};

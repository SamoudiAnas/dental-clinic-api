import { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { ERROR_INTERNAL_SERVER, STATUS_OK } from "../constants/http-status";
import { TIME_SLOTS } from "../constants/time-slots";
import { getAvailableSlots } from "../utils/date";

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const result = await Appointment.findAll();

    /**
     * If there are no appointments,
     * return a list of available times for the month
     */
    if (!result) {
      const availability = Array(30)
        .fill(0)
        .map((_, index) => {
          return {
            date: new Date(new Date().setDate(index + 1)),
            slots: TIME_SLOTS,
          };
        });
      return res.status(STATUS_OK).json({ availability });
    }

    /**
     * If there are appointments,
     * return a list of available times for the month
     */
    const availability = Array(30)
      .fill(0)
      .map((_, index) => {
        const date = new Date(new Date().setDate(index + 1));
        const appointments = result.filter(
          (appointment) =>
            new Date(appointment.date).getDate() === date.getDate()
        );

        if (appointments.length === 0) {
          return {
            date,
            slots: TIME_SLOTS,
          };
        }

        const slotsAvailable = getAvailableSlots(appointments);

        return {
          date,
          slots: slotsAvailable,
        };
      });

    return res.status(STATUS_OK).json({ availability });
  } catch (error) {
    console.error("Error getting availability:", error);
    return res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error getting availability" });
  }
};

/**
 *  GET - availability/:date
 */
export const getAvailabilityByDate = async (req: Request, res: Response) => {
  try {
    const date = new Date(req.params.date);
    const appointments = await Appointment.findAll({
      where: { date },
    });

    /**
     * If there are no appointments,
     * return a list of available times for the month
     */
    if (appointments.length === 0) {
      const availability = {
        date,
        slots: TIME_SLOTS,
      };
      return res.status(STATUS_OK).json({ availability });
    }

    /**
     * If there are appointments,
     * return a list of available times for the month
     */
    const slotsAvailable = getAvailableSlots(appointments);

    const availability = {
      date,
      slots: slotsAvailable,
    };

    return res.status(STATUS_OK).json({ availability });
  } catch (error) {
    console.error("Error getting availability:", error);
    return res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error getting availability" });
  }
};

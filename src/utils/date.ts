import { TIME_SLOTS, TimeSlot } from "../constants/time-slots";
import { Appointment } from "../models/appointment.model";

/**
 * Check if a date is a weekend
 */
export const checkIfDateIsInWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Get available slots from a list of appointments
 */
export const getAvailableSlots = (appointments: Appointment[]) => {
  const timeSlots = TIME_SLOTS as unknown as TimeSlot[];

  if (appointments.length === 0) {
    return timeSlots;
  }

  const availableSlots = timeSlots;

  /**
   * Loop through the appointments
   */
  appointments.forEach((appointment) => {
    /**
     * Get the start and end time of the appointment
     */
    const startTime = new Date(appointment.startTime);
    const endTime = new Date(appointment.endTime);

    /**
     * Get the start and end slots
     */
    const startSlot = timeSlots.indexOf(
      `${startTime.getHours().toString().padStart(2, "0")}:${startTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}` as TimeSlot
    );
    const endSlot = timeSlots.indexOf(
      `${endTime.getHours().toString().padStart(2, "0")}:${endTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}` as TimeSlot
    );

    /**
     * Remove slots that are booked
     */
    availableSlots.splice(startSlot, endSlot);
  });

  return availableSlots;
};

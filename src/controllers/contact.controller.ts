import { Request, Response } from "express";
import { ERROR_INTERNAL_SERVER, STATUS_OK } from "../constants/http-status";
import { Message, MessageCreationAttributes } from "../models/message.model";

/**
 *  POST - contact
 */

export const createMessage = async (req: Request, res: Response) => {
  try {
    const {
      fullName = "",
      phoneNumber = "",
      email = "",
      message = "",
    } = req.body as MessageCreationAttributes;

    /**
     * Validate the data
     */

    if (!fullName || !phoneNumber || !message) {
      return res.status(ERROR_INTERNAL_SERVER).json({ error: "Missing data" });
    }

    /**
     * Create a new message
     */
    await Message.create({
      fullName,
      phone: phoneNumber,
      email,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(STATUS_OK).json({ message: "Message sent" });
  } catch (error) {
    console.error("Error getting availability:", error);
    return res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error getting availability" });
  }
};

import { NextFunction, Request, Response } from "express";

import {
  ERROR_CONFLICT,
  ERROR_INTERNAL_SERVER,
} from "../constants/http-status";
import { User } from "../models";

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Check if the email already exists
     */
    const emailExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    /**
     * If the email already exists, return an error
     */
    if (emailExists) {
      return res.status(ERROR_CONFLICT).send("Email already exists");
    } else {
      next();
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error creating user" });
  }
};

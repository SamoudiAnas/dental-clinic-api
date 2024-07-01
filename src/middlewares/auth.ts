import { NextFunction, Request, Response } from "express";

import {
  ERROR_CONFLICT,
  ERROR_FORBIDDEN,
  ERROR_INTERNAL_SERVER,
  ERROR_UNAUTHORIZED,
} from "../constants/http-status";
import { User } from "../models";
import { verify } from "jsonwebtoken";

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

/**
 * Middleware to verify the token
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies["token"];

  /**
   * If the token is not provided, return an error
   */
  if (!token) {
    return res.status(ERROR_FORBIDDEN).send({ error: "Unauthorized" });
  }

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    /**
     * If the token is invalid, return an error
     */
    if (err) {
      return res.status(ERROR_UNAUTHORIZED).send({ error: "Unauthorized" });
    }

    /**
     * Set the userId in the request
     */
    req["userId"] = decoded.id;
    next();
  });
};

import { NextFunction, Request, Response } from "express";

import { ERROR_FORBIDDEN, ERROR_UNAUTHORIZED } from "../constants/http-status";
import { verify } from "jsonwebtoken";

/**
 * Middleware to verify the token
 */
export const authorizeAdminToken = (
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
     * If the user is not an admin, return an error
     */
    if (!decoded.isAdmin) {
      return res.status(ERROR_UNAUTHORIZED).send({ error: "Unauthorized" });
    }

    /**
     * Set the userId in the request
     */
    req["userId"] = decoded.id;
    next();
  });
};

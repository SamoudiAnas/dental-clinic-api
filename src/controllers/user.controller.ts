import { ERROR_INTERNAL_SERVER, STATUS_OK } from "../constants/http-status";

import { User } from "../models";
import { Request, Response } from "express";

/**
 * GET all users
 * returns all users in the database
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll();
    res.status(STATUS_OK).json({ users: result });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(ERROR_INTERNAL_SERVER).json({ error: "Error getting users" });
  }
};

/**
 * GET - users/:id
 * returns a user by id
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await User.findByPk(id);
    res.status(STATUS_OK).json({ user: result });
  } catch (error) {
    console.error("Error getting user by id:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error getting user by id" });
  }
};

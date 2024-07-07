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

/**
 * POST - users/update
 * updates a user
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req["userId"];

    /**
     * Find the user by id
     */
    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "User not found" });
    }

    /**
     * Get the fields to update
     */
    const {
      name = "",
      phone = "",
      birthdate = "",
      country = "",
    } = req.body as Partial<User>;

    const updates: Partial<User> = {};

    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (birthdate) updates.birthdate = new Date(birthdate);
    if (country) updates.country = country;

    /**
     * Update the user
     */
    await user.update(updates);
    return res.status(STATUS_OK).json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(ERROR_INTERNAL_SERVER).json({ error: "Error updating user" });
  }
};

/**
 * POST - users/password-reset
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const id = req["userId"];
    const { password } = req.body as { password: string };

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "User not found" });
    }

    user.password = password;
    await user.save();

    return res.status(STATUS_OK).json({ user });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Error resetting password" });
  }
};

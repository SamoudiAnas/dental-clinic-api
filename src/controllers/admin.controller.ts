import { Request, Response } from "express";
import { ERROR_INTERNAL_SERVER, STATUS_OK } from "../constants/http-status";
import { User } from "../models";

export const addUserAsAdmin = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];

    /**
     * Add the user as an admin
     */
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    return res.status(STATUS_OK).json({ message: "User added as admin" });
  } catch (err) {
    console.error("Error adding user as admin:", err);
    return res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Internal server error" });
  }
};

export const removeAdminPrivileges = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];

    /**
     * Remove the user as an admin
     */
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "User not found" });
    }

    user.isAdmin = false;
    await user.save();

    return res.status(STATUS_OK).json({ message: "Admin privileges removed" });
  } catch (err) {
    console.error("Error removing admin privileges:", err);
    return res
      .status(ERROR_INTERNAL_SERVER)
      .json({ error: "Internal server error" });
  }
};

import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import {
  ERROR_INTERNAL_SERVER,
  ERROR_UNAUTHORIZED,
  STATUS_CREATED,
} from "../constants/http-status";
import { User, UserCreationAttributes } from "../models";

const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

/**
 * POST - users/create-account
 * creates a new user
 */
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, name, phone, password } = req.body as UserCreationAttributes;

    /**
     * hash the password
     */
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    /**
     * Create the user
     */
    const result = await User.create({
      email,
      name,
      phone,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    /**
     * If the user is not created, return an error
     */
    if (!result) {
      return res
        .status(ERROR_INTERNAL_SERVER)
        .json({ error: "Error creating user" });
    }

    /**
     * if the user is created, generate a token
     * and set the cookie with the token generated
     */
    const token = sign(
      { id: result.id, isAdmin: result.dataValues.isAdmin },
      process.env.JWT_SECRET as string,
      {
        expiresIn: WEEK_IN_MILLISECONDS,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: WEEK_IN_MILLISECONDS,
    });

    const newUser = result.dataValues as User;
    return res.status(STATUS_CREATED).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(ERROR_INTERNAL_SERVER).json({ error: "Error creating user" });
  }
};

/**
 *  POST - users/login
 *  logs in a user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    /**
     * If the user is not found, return an error
     */
    if (!user) {
      return res.status(ERROR_UNAUTHORIZED).send("Email/Password is incorrect");
    }

    const isSame = await bcrypt.compare(password, user.password);

    /**
     * If the password is not the same, return an error
     */
    if (!isSame) {
      return res.status(ERROR_UNAUTHORIZED).send("Email/Password is incorrect");
    }

    const token = sign(
      { id: user.id, isAdmin: user.dataValues.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: WEEK_IN_MILLISECONDS,
      }
    );

    /**
     * Set the cookie with the token generated
     */
    res.cookie("jwt", token, {
      maxAge: WEEK_IN_MILLISECONDS,
      httpOnly: true,
    });

    /**
     * Return the user
     */
    return res
      .status(STATUS_CREATED)
      .send({ ...user, token: token, password: undefined });
  } catch (error) {
    console.error(error);
    return res.status(ERROR_INTERNAL_SERVER).send("Error logging in");
  }
};

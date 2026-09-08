import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req: Request, res: Response) => {
  const reqBody = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: reqBody.email,
      },
    });

    const hash = await bcrypt.hash(req.body.password, 10);
    const body = {
      ...reqBody,
      password: hash,
    };

    console.log(hash.length);

    if (!user) {
      const createdUser = await prisma.users.create({
        data: body,
      });
      return res.status(201).json({ created: createdUser });
    } else {
      return res.status(400).json({ message: "Duplicate email" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const reqBody = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: reqBody.email,
      },
    });

    const hash = await bcrypt.hash(reqBody.password, 10);
    const body = {
      ...reqBody,
      password: hash,
    };

    if (!user) {
      const createdUser = await prisma.users.create({
        data: body,
      });

      return res.status(201).json({ created: createdUser });
    } else {
      return res.status(400).json({ message: "Duplicate email" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  const jwtAccessSecret: string = process.env.ACCESS_JWT_SECRET || "";
  const jwtRefreshSecret: string = process.env.REFRESH_JWT_SECRET || "";

  try {
    const userExist = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!userExist)
      return res.status(401).json({ message: "Incorrect Email or Password" });

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      userExist.password,
    );

    if (isPasswordCorrect) {
      jwt.sign(
        { userName: body.userName },
        jwtRefreshSecret,
        { expiresIn: "7d", algorithm: "HS256" },
        async (err, token) => {
          if (err) return res.status(500).json({ err });
          if (!token)
            return res.status(500).json({ message: "Internal Server Error" });

          const refreshTokenHash = await bcrypt.hash(token, 10);

          res.cookie("refresh", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
          });

          await prisma.users.update({
            where: { email: userExist.email },
            data: { refresh: refreshTokenHash },
          });
        },
      );

      jwt.sign(
        {
          userName: body.userName,
        },
        jwtAccessSecret,
        { expiresIn: "1h", algorithm: "HS256" },
        (err, token) => {
          if (err) return res.status(500).json({ err });

          return res
            .status(200)
            .json({ message: "User logged in successfully", token: token });
        },
      );
    } else {
      return res.status(401).json({ message: "Incorrect Email or Password" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const cookie = req.cookies.refresh;
  const jwtRefreshSecret = process.env.REFRESH_JWT_SECRET || "";
  const jwtAccessSecret = process.env.ACCESS_JWT_SECRET || "";

  try {
    if (!cookie) return res.sendStatus(401);
    const userExist = await prisma.users.findUnique({
      where: { refresh: cookie },
    });

    if (!userExist) return res.sendStatus(401);

    jwt.verify(cookie, jwtRefreshSecret);
    const token = jwt.sign({ userName: userExist.userName }, jwtAccessSecret, {
      expiresIn: "15m",
    });

    if (!token) return res.sendStatus(500);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

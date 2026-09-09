import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { signJwt } from "../services/token.service.js";

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
      const refreshToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      const sessionBody = {
        userId: userExist.id,
        token_hash: tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };

      const createdSession = await prisma.sessions.create({
        data: sessionBody,
      });

      if (createdSession) {
        res.cookie("refresh", refreshToken, {
          maxAge: 7 * 60 * 60 * 1000,
          secure: true,
          httpOnly: true,
        });
      }

      const accessToken = signJwt({ userName: userExist.id }, jwtAccessSecret, {
        expiresIn: "15m",
        algorithm: "HS256",
      });

      if (!accessToken)
        return res.status(500).json({ message: "Internal Server Error" });

      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ message: "Incorrect Email or Password" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const jwtAccessSecret = process.env.ACCESS_JWT_SECRET || "";
  const refreshToken = req.cookies?.refresh;
  try {
    if (!refreshToken) return res.sendStatus(401);
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const foundSession = await prisma.sessions.findUnique({
      where: { token_hash: tokenHash },
      include: { users: { include: { roles: true } } },
    });

    const jwtToken = signJwt(
      { userId: foundSession?.users.id },
      jwtAccessSecret,
      { expiresIn: "1h", algorithm: "HS256" },
    );

    if (!foundSession) return res.status(401).json({ message: "UNAUTHORIZED" });
    console.log("Session", foundSession);

    return res.status(200).json({ token: jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

import type { Request, Response } from "express";
import { safeParse } from "zod";
import { DeleteUser, User, type UserType } from "../schema/user.schema.js";
import {
  deleteUserService,
  registerUserService,
} from "../services/user.service.js";

export const registerUser = async (
  req: Request<{}, {}, UserType>,
  res: Response,
) => {
  const reqBody = req.body;
  const result = safeParse(User, reqBody);
  if (!result.success) return res.status(400).json({ message: result.error });

  try {
    const result = await registerUserService(reqBody);
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(500).json({
      message: err instanceof Error ? err.message : String(err),
    });
  }
};

export const deleteUser = async (req: Request<DeleteUser>, res: Response) => {
  const userId: string = req.params.id;
  const result = safeParse(DeleteUser, req.params);

  if (!result.success) return res.status(400).json({ message: result.error });

  try {
    const data = await deleteUserService(userId);
    return res.status(204);
  } catch (err) {
    return res.status(500).json({
      message: err instanceof Error ? err.message : String(err),
    });
  }
};

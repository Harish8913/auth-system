import type { JwtPayload } from "jsonwebtoken";

export interface RegisterUserBody {
  userName: string;
  email: string;
  password: string;
  status: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface JwtData extends JwtPayload {
  userName: string;
  role: string[];
  permission: string[];
}

import jwt from "jsonwebtoken";

export const signJwt = (payload: any, secret: string, options: any) => {
  return jwt.sign(payload, secret, options);
};

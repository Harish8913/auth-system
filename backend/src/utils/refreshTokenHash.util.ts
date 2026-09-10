import crypto from "node:crypto";

export const refreshTokenHash = (token: string) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");

  return hash;
};

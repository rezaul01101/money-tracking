import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; id: string | number; name:string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

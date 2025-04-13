import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; id: string | number; name: string },
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

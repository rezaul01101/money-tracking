import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import prisma from "./prisma";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

const authUser = async (token: string) => {
  const decoded = jwt.verify(token, config?.jwt.secret) as JwtPayload;
  const { email } = decoded;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found");
  }
  return isUserExist;
};
export const helper = {
  authUser,
};

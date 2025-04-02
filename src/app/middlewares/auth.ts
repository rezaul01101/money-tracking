import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../../shared/catchAsync";
import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, config?.jwt.secret) as JwtPayload;

    const { email, id } = decoded;

    // checking if the user is exist
    //checking exists user by email
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "This user is not found");
    }

    // Attach user data to the request object
    req.user = isUserExist;

    // checking if the user is already deleted

    // const isDeleted = isUserExist?.deletedAt;

    // if (isDeleted) {
    //   throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
    // }

    // checking if the user is blocked
    // const userStatus = user?.status;

    // if (userStatus === "blocked") {
    //   throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
    // }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    // }

    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     "You are not authorized  hi!"
    //   );
    // }

    // req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;

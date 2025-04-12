import prisma from "../../../shared/prisma";
import config from "../../../config";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser, ILoginUserResponse, IUser } from "./auth.interface";
import { createToken } from "./auth.utils";

//login user
const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  //checking exists user by email
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const accessToken = createToken(
    { email: email, id: isUserExist.id, name: isUserExist?.name || "" },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { email: email, id: isUserExist?.id, name: isUserExist?.name || "" },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

//signup user
const insertIntoDB = async (data: IUser): Promise<any> => {
  const { password, ...user } = data;

  //checking exists user by email
  if (user?.email) {
    const existUser = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });
    if (existUser) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Already exists this user. Please try again other email"
      );
    }
  }

  //generate plan password to encrypt password
  const encodedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );

  //user create
  const result = await prisma.user.create({
    data: {
      ...user,
      password: encodedPassword,
    },
  });
  return result;
};
const forgotPassword = async (email: string): Promise<any> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const resetCode = Math.floor(10000 + Math.random() * 90000).toString();
  const expiresAt = new Date(Date.now() + 40 * 60 * 1000); // 40 min

  const passwordRest = await prisma.passwordReset.create({
    data: {
      email,
      code: resetCode,
      expiresAt,
    },
  });
  return passwordRest;
};
const verifyOtpFromDb = async (otp:string,email:string):Promise<any>=>{
  const isOtpExists = await prisma.passwordReset.findFirst({
    where:{
      email: email,
      code:otp,
      expiresAt: {
        gte: new Date(), // not expired
      },
    },
  })
  if(!isOtpExists){
    throw new ApiError(httpStatus.NOT_FOUND, "Otp is not valid");
  }
return isOtpExists;
}
const resetPassword = async (password:string,email:string,otp:string):Promise<any>=>{
  //check otp is valid or not
  const isOtpExists = await prisma.passwordReset.findFirst({
    where:{
      email: email,
      code:otp,
      expiresAt: {
        gte: new Date(), // not expired
      },
    },
  })
  if(!isOtpExists){
    throw new ApiError(httpStatus.NOT_FOUND, "Otp is not valid");
  }
  //update password
  const encodedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await prisma.user.update({
    where:{
      email: email,
    },
    data:{
      password: encodedPassword,
    },
  })

  //delete otp from db
  if(result){
    await prisma.passwordReset.delete({
      where:{
        id: isOtpExists?.id,
      },
    })
  }
  return result;
}
export const AuthService = {
  insertIntoDB,
  loginUser,
  forgotPassword,
  verifyOtpFromDb,
  resetPassword
};
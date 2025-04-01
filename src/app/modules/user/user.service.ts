import { helper } from "../../../shared/helper";
import prisma from "../../../shared/prisma";
import { USER_PROPS } from "./user.interface";

const userList = async () => {
  const users = await prisma.user.findMany();
  return users;
};
const getUserFromDB = async (token:string) => {
  const authUser = await helper.authUser(token);
  const user = await prisma.user.findFirst({
    where:{
      id:authUser.id
    }
  });
  return user;
};
const updateUserDB = async (token:string,data:USER_PROPS) => {
  const authUser = await helper.authUser(token);
  const user = await prisma.user.update({
    where:{
      id:authUser.id
    },
    data:{
      name:data?.name
    }
  });
  return user;
};
export const UserService = {
    userList,
    getUserFromDB,
    updateUserDB
  };
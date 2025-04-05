import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

interface ISettings {
  currency: string;
}

const updateSettings = async (data: ISettings, user: User, image: any): Promise<any> => {

  if(image){
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        image: image
      }
    })
  }
  
  const results = await Promise.all(
    Object.entries(data).map(([key, value]) => 
      prisma.userSetting.upsert({
        where: {
          user_id_key: {
            user_id: user.id,
            key: key
          }
        },
        create: {
          key: key,
          value: value?.toString(),
          user_id: user.id
        },
        update: {
          value: value?.toString()
        },
        select: {
          key: true,
          value: true
        }
      })
    )
  );

  return results;
};

const getSettings = async (user: User): Promise<any> => {
  const result = await prisma.userSetting.findMany({
    where: {
      user_id: user.id
    },
    select: {
      key: true,
      value: true
    }
  });

  return result;
};


export const SettingsService = {
  updateSettings,
  getSettings
};

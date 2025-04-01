export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IUser = {
  id: number;
  name: string;
  email: string;
  image: string | null;
  password: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

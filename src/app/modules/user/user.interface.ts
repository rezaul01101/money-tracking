const USER_ROLE = {
  superAdmin: "superAdmin",
  user: "user",
} as const;
export type TUserRole = keyof typeof USER_ROLE;
export type USER_PROPS = {
  name: string;
};

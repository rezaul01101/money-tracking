/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  frontend_url: process.env.FRONTEND_URL,
  app_name: process.env.APP_NAME,
  jwt: {
    secret: process.env.JWT_SECRET as Secret,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
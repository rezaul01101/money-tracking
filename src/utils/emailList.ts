import sendEmail from "./sendEmail";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import config from "../config";
export const varificationEmail = async (email: string, name: string,verificationToken:string) => {
  
  const source = fs.readFileSync(
    path.join(__dirname, "../mail-templates/varificationEmail.html"),
    "utf-8"
  );
  const template = handlebars.compile(source);
  const verification_link = `${config.frontend_url}/verify-email?token=${verificationToken}`;
  
  const emailInfo = await sendEmail({
    to: email,
    subject: `Verify your email address - ${config.app_name}`,
    html: template({ email, name, url: verification_link }),
    text: "",
  });

  return emailInfo;
};

export const otpSendForPasswordResetEmail = async (email: string, name: string,otp:string) => {
  
  const source = fs.readFileSync(
    path.join(__dirname, "../mail-templates/forgot-password.html"),
    "utf-8"
  );
  const template = handlebars.compile(source);
  
  const emailInfo = await sendEmail({
    to: email,
    subject: "Password Reset Code - Money Management",
    html: template({ email, name, otp }),
    text: "",
  });

  return emailInfo;
};



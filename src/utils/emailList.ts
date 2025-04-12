import sendEmail from "./sendEmail";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
export const varificationEmail = async (email: string, name: string) => {
  
  const source = fs.readFileSync(
    path.join(__dirname, "../mail-templates/varificationEmail.html"),
    "utf-8"
  );
  const template = handlebars.compile(source);
  const verification_link = `http://localhost:3000/verify-email/${email}`;
  
  const emailInfo = await sendEmail({
    to: "rezaulhoque0101@gmail.com",
    subject: "Welcome to our platform!",
    html: template({ email, name, verification_link }),
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



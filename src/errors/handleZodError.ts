import { ZodError, ZodIssue } from "zod";
// import { IGenericErrorResponse } from "../interfaces/common";
// import { IGenericErrorMessage } from "../interfaces/error";

const handleZodError = (error: ZodError): any => {
  const errors: any = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;

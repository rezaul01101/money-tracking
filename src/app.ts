import cors from "cors";
import express, {
  Application,
  NextFunction,
  Request,
  response,
  Response,
} from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import routes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import path from "path";
const app: Application = express();

app.use(
  cors({
    origin: [
      "http://expense.greatbd.info",
      "http://localhost:3002",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/upload/:imageName", function (req, res) {
  const { imageName } = req.params;
  const filepath = path.join(__dirname, "../upload", imageName);
  res.sendFile(filepath);
});

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running smoothly",
    timestamp: new Date().toISOString()
  });
});

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;

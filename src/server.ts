/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import config from "./config";
// import { logger } from "./shared/logger";
let server: Server;


async function bootstrap() {
  try {
    server = app.listen(config?.port, () => {
      console.log(`Application  listening on port ${config?.port}`);
    });
  } catch (err) {}
}
bootstrap();

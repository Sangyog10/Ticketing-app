import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, notFoundError, currentUser } from "@santicket/common";
import { createChargeRouter } from "./routes/new";


const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);
app.use(createChargeRouter)

app.all("*", (req, res, next) => {
  throw new notFoundError();
});
app.use(errorHandler);

export { app };

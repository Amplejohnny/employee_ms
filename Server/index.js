import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoute.js";
import { employeeRouter } from "./Routes/employeeRoute.js";
import { verifyRouter } from "./Routes/verifyRoute.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: ["https://employee-ms-ui.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", adminRouter);
app.use("/auth", employeeRouter);
app.use("/auth", verifyRouter);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

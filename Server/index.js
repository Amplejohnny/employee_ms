import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoute.js";
import { employeeRouter } from "./Routes/employeeRoute.js";
import { verifyRouter } from "./Routes/verifyRoute.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
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

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

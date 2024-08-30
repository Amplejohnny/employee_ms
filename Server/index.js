import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoute.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", adminRouter);
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

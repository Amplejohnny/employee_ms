import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoute.js";
import Jwt from "jsonwebtoken";
// import { employeeRouter } from "./Routes/employeeRoute.js";
// import { verifyRouter } from "./Routes/verifyRoute.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", adminRouter);
// app.use("/auth", employeeRouter);
// app.use("/auth", verifyRouter);
// app.use(express.static("public"));

const router = express.Router();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Invalid Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not autheticated" });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

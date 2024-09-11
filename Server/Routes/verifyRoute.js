import express from "express";
import Jwt from "jsonwebtoken";

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


  export { router as verifyRouter };

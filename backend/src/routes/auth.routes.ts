import express from "express";
const router = express.Router();
import { body } from "express-validator";
import controller from "../controllers/auth";
import middlewares from "../middlewares";

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  middlewares.validateRequest,
  controller.register
);

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  middlewares.validateRequest,
  controller.login
);

export default router;

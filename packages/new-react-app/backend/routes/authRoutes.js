
import express from "express";
import { sendCode, verifyCode } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);

export default router;
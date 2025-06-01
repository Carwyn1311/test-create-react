import express from "express";
import {
  likeGithubUser,
  getUserProfile,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/likeGithubUser", likeGithubUser);
router.get("/getUserProfile", getUserProfile);

export default router;
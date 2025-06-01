
import express from "express";
import { searchGithubUsers, findGithubUser } from "../controllers/githubController.js";

const router = express.Router();

router.get("/searchGithubUsers", searchGithubUsers);

router.get("/findGithubUser", findGithubUser);

export default router;
import express from "express";
import {
  postId_GET,
  post_GET,
  post_PATCH,
  post_POST,
} from "../controllers/postController.js";
import { checkPostDetails } from "../middlewares/checkPostDetails.js";
import { checkToken } from "../middlewares/checkTokenMiddleware.js";
import { checkUserAlreadyLikedPost } from "../middlewares/checkUserAlreadyLikedPost.js";

const router = express.Router();

router.get("/", post_GET);
router.patch("/:id", checkToken, checkUserAlreadyLikedPost, post_PATCH);
router.get("/:id", postId_GET);
router.post("/", checkToken, checkPostDetails, post_POST);

export default router;

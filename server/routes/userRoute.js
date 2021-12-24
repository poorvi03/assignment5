import express from "express";
import {
  login_POST,
  logout_GET,
  postLiked_PATCH,
  signUp_POST,
  update_PATCH,
  userId_GET,
  user_DELETE,
  user_GET,
} from "../controllers/userController.js";
import { checkSignUpDetails } from "../middlewares/checkSignUpDetails.js";
import { checkToken } from "../middlewares/checkTokenMiddleware.js";
import { checkUserLoginDetails } from "../middlewares/checkUserLoginDetails.js";
import { checkUserUpdateDetails } from "../middlewares/checkUserUpdateDetails.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/profilePictures");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", checkToken, user_GET);
router.get("/logout", logout_GET);
router.patch("/postLiked", checkToken, postLiked_PATCH);
router.get("/:id", userId_GET);
router.patch(
  "/:id",
  upload.single("avatar"),
  checkUserUpdateDetails,
  update_PATCH
);
router.delete("/:id", user_DELETE);

router.post("/sign-up", checkSignUpDetails, signUp_POST);
router.post("/login", checkUserLoginDetails, login_POST);

export default router;

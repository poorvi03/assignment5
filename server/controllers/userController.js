import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const createToken = ({ _id }) => {
  return jwt.sign({ _id }, "admin");
};

export const user_GET = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findById(userId);

    res.status(200).send(user);
  } catch (error) {
    console.log("ERROR IN user_GET", error);
    res.sendStatus(401);
  }
};

export const userId_GET = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    const { name, profilePicture, postLiked } = user;

    res.status(200).json({ name, profilePicture, postLiked });
  } catch (error) {
    console.log("ERROR in userId_GET:", error);
    res.sendStatus(400);
  }
};

export const signUp_POST = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    const token = createToken(user._id);

    res.cookie("jwt", token);

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR IN signUp_POST", error);
    res.sendStatus(422);
  }
};

export const login_POST = async (req, res) => {
  try {
    const token = createToken(res.locals.userId);

    res.cookie("jwt", token);

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR IN login_POST", error);
    res.sendStatus(400);
  }
};

const getAvatar = (req, userId) => {
  if (req.file) {
    fs.renameSync(req.file.path, req.file.destination + `/${userId}.png`);
    return "http://localhost:5000/uploads/profilePictures/" + `${userId}.png`;
  }

  return req.body.avatar;
};

export const update_PATCH = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  const avatar = getAvatar(req, userId);
  console.log(avatar);

  try {
    await User.findByIdAndUpdate(userId, {
      name,
      email,
      profilePicture: avatar,
    });

    console.log("updated successfully");

    res.sendStatus(200);
  } catch (error) {
    let errors = { name: "", email: "" };

    const key = Object.keys(error.keyValue)[0];
    errors[key] = `This ${key} is already used`;

    console.log("ERROR in update_PATCH:", errors);
    res.status(400).json(errors);
  }
};

export const logout_GET = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    console.log("logout successful");
    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in logout_GET:", error);
    res.sendStatus(400);
  }
};

export const user_DELETE = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.cookie("jwt", "", { maxAge: 1 });
    fs.stat("uploads/profilePictures/" + userId + ".png", (err, stat) => {
      if (err == null) {
        fs.unlink("uploads/profilePictures/" + userId + ".png", () => {});
      }
    });

    console.log("user deleted");

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in user_DELETE:", error);
    res.sendStatus(400);
  }
};

export const postLiked_PATCH = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const { postId, hasLiked } = req.body;
    if (hasLiked) {
      await User.findByIdAndUpdate(userId, {
        $pull: { postLiked: postId },
      });
      console.log("post liked remove to array");
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { postLiked: postId },
      });
      console.log("post liked add to array");
    }

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in postLiked_POST:", error);
    res.sendStatus(400);
  }
};

import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "dede"],
    unique: true,
    minlength: [4, "dede"],
    maxlength: [20, "dede"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 6,
    maxlength: 50,
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },

  profilePicture: {
    type: String,
    default: "http://localhost:5000/uploads/profilePictures/defaultAvatar.png",
  },

  postLiked: [],
});

export const userJoiSchema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  email: Joi.string().min(6).max(50).email().required(),
  password: Joi.string().min(4).max(50).required(),
});

userSchema.pre("save", async function (next) {
  console.log("change the password");

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.post("save", (doc, next) => {
  console.log(doc);
  next();
});

export default mongoose.model("User", userSchema);

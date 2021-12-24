import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  authorId: {
    type: String,
    required: true,
  },

  numberOfLikes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", postSchema);

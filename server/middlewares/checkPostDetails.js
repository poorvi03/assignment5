import DuplicateKeyError from "../errorsClasses/DuplicateKeyError.js";
import Post from "../Models/Post.js";

export const checkPostDetails = async (req, res, next) => {
  const { title, body } = req.body;

  try {
    if (title === "") {
      throw { name: "title", message: "Enter a valid title" };
    }

    if (body === "") {
      throw { name: "body", message: "Enter a valid body" };
    }

    if (await Post.findOne({ title })) {
      throw new DuplicateKeyError("title", "This title is already used");
    }

    next();
  } catch (error) {
    console.log("ERROR in checkPostDetails:", error);
    let errors = { title: "", body: "" };

    errors[error.name] = error.message;

    res.status(400).json(errors);
  }
};

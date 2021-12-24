import DuplicateKeyError from "../errorsClasses/DuplicateKeyError.js";
import User, { userJoiSchema } from "../Models/User.js";

export const checkSignUpDetails = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    await userJoiSchema.validateAsync({
      name,
      email,
      password,
    });

    if (await User.findOne({ name })) {
      throw new DuplicateKeyError("name", "This name is already used");
    }

    if (await User.findOne({ email })) {
      throw new DuplicateKeyError("email", "This email is already used");
    }

    next();
  } catch (error) {
    let errors = { name: "", email: "", password: "" };

    if (error instanceof DuplicateKeyError) {
      errors[error.name] = error.message;
    }

    if (error.name === "ValidationError") {
      const key = error.details[0].path[0];
      errors[key] = error.details[0].message.replace(`"${key}"`, key);
    }

    console.log(errors);
    res.status(422).json(errors);
  }
};

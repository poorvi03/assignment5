import User from "../Models/User.js";
import bcrypt from "bcrypt";

export const checkUserLoginDetails = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);

      if (correctPassword) {
        res.locals.userId = user._id;
        return next();
      } else {
        throw { name: "password", message: "invalid password" };
      }
    } else {
      throw { name: "email", message: "invalid email" };
    }
  } catch (error) {
    let errors = { email: "", password: "" };
    errors[error.name] = error.message;
    console.log("ERROR IN checkUserLoginDetails middleware", error);
    console.log(errors);
    res.status(401).json(errors);
  }
};

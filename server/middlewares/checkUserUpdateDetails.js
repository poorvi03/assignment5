import User, { userJoiSchema } from "../Models/User.js";

export const checkUserUpdateDetails = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    await userJoiSchema.validateAsync({
      name,
      email,
      password: "dededede",
    });

    next();
  } catch (error) {
    console.log("ERROR in checkUserUpdateDetails:", error);
    let errors = { name: "", email: "" };
    const key = error.details[0].path[0];
    errors[key] = error.details[0].message.replace(`"${key}"`, key);
    res.status(400).json(errors);
  }
};

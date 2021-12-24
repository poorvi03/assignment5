import User from "../Models/User.js";

export const checkUserAlreadyLikedPost = async (req, res, next) => {
  try {
    const { postLiked } = await User.findById(res.locals.userId);

    console.log(postLiked);
    console.log(req.params.id);

    if (postLiked.includes(req.params.id)) {
      res.locals.hasLiked = true;
    } else {
      res.locals.hasLiked = false;
    }

    next();
  } catch (error) {
    console.log("ERROR in checkUserAlreadyLikedPost:", error);
    res.sendStatus(400);
  }
};

import Post from "../Models/Post.js";

export const post_GET = async (req, res) => {
  try {
    const posts = await Post.find();

    console.log("posts fetched");
    res.status(200).json(posts);
  } catch (error) {
    console.log("ERROR in post_GET:", error);
    res.sendStatus(400);
  }
};

export const postId_GET = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const post_POST = async (req, res) => {
  const { title, body } = req.body;
  const authorId = res.locals.userId;

  try {
    const post = await Post.create({ title, body, authorId });

    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    console.log("ERROR in post_POST:", error);
    res.sendStatus(400);
  }
};

export const post_PATCH = async (req, res) => {
  try {
    const hasLiked = res.locals.hasLiked;
    const postId = req.params.id;

    console.log(hasLiked);

    if (hasLiked) {
      await Post.findByIdAndUpdate(postId, {
        $inc: { numberOfLikes: -1 },
      });
      console.log("user unliked a post");
    } else {
      await Post.findByIdAndUpdate(postId, {
        $inc: { numberOfLikes: 1 },
      });
      console.log("user liked a post");
    }

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in post_PATCH:", error);
    res.sendStatus(400);
  }
};

import { useEffect, useState } from "react";
import "./SpecificPost.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikeSvg from "../../assets/svgs/LikeSvg";

const SpecificPost = ({ user }) => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [author, setUser] = useState({});

  const [hasLiked, setHasLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    const postId = params.id;

    axios
      .get("http://localhost:5000/api/post/" + postId)
      .then((result) => {
        setPost(result.data);
        setNumberOfLikes(result.data.numberOfLikes);
      })
      .catch((error) =>
        console.log("ERROR in useEffect SpecificPost:", { error })
      );
  }, [params.id]);

  useEffect(() => {
    if (Object.keys(post).length > 0) {
      axios
        .get("http://localhost:5000/api/user/" + post.authorId)
        .then((result) => setUser(result.data))
        .catch((error) =>
          console.log("ERROR in useEffect2 SpecificPost:", error)
        );
    }
  }, [post]);

  useEffect(() => {
    if (user) {
      if (user.postLiked.includes(post._id)) {
        console.log("de");
        setHasLiked(true);
      }
    }
  }, [user, post._id]);

  return (
    <div className="specificPost-container">
      <h1 className="specificPost-title">{post.title}</h1>
      <h1 className="specificPost-body">{post.body}</h1>

      <div className="specificPost-author-details">
        <img
          src={author.profilePicture}
          alt="profilePicture"
          className="specificPost-profilePicture"
        />
        <h1 className="specificPost-author">{author.name}</h1>
        <div className="specificPost-numberOfLikes-container">
          <LikeSvg
            postId={post._id}
            hasLiked={hasLiked}
            setHasLiked={setHasLiked}
            setNumberOfLikes={setNumberOfLikes}
            numberOfLikes={numberOfLikes}
          />
          <h1>{numberOfLikes}</h1>
        </div>
      </div>
    </div>
  );
};

export default SpecificPost;

import axios from "axios";
import { useEffect, useState } from "react";

import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ post, user }) => {
  const [authorName, setAuthorName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/" + post.authorId)
      .then((result) => {
        setAuthorName(result.data.name);
        setProfilePicture(result.data.profilePicture);
      })
      .catch((error) => console.log("ERROR in Post useEffect:", error));
  }, [post.authorId]);

 

  return (
    <div className="post-container">
      <Link to={`/post/${post._id}`} className="post-link">
        <h1 className="post-title">{post.title}</h1>
         <h3 className="post-body">{post.body}</h3>
      </Link>
      <div className="post-author-details">
      </div>
    </div>
  );
};

export default Post;

import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Post from "../Post";
import AddPostButton from "../AddPostButton";
import AddPostModal from "../AddPostModal";
import "./Home.css";

function Home({ userAuthenticated, user }) {
  const [canShowModal, setCanShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post")
      .then((result) => setPosts(result.data))
      .catch((error) => console.log("ERROR in home useEffect:", error));
  }, []);

  return (
    <div className="home-container">
      <div className="home-posts-container">
        {posts.map((post) => {
          return <Post key={post._id} post={post} user={user} />;
        })}
      </div>

      <AddPostButton
        userAuthenticated={userAuthenticated}
        setCanShowModal={setCanShowModal}
      />

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {canShowModal && (
          <AddPostModal
            canShowModal={canShowModal}
            setCanShowModal={setCanShowModal}
            setPosts={setPosts}
            posts={posts}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;

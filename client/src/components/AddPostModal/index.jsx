import { motion } from "framer-motion";
import "./AddPostModal.css";
import "../../css/Inputs.css";
import axios from "axios";
import { useState } from "react";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const AddPostModal = ({ setCanShowModal, setPosts, posts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const handleCloseModal = (e) => {
    e.preventDefault();
    setCanShowModal(false);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setTitleError("");
    setBodyError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/post",
        {
          title,
          body,
        },
        { withCredentials: true }
      );
      console.log(res.status);

      if (res.status === 200) {
        const newPosts = [...posts];
        newPosts.push(res.data);
        setPosts(newPosts);
        setCanShowModal(false);
      }
    } catch (error) {
      setTitleError(error.response.data.title);
      setBodyError(error.response.data.body);
      console.log("ERROR in add post modal:", { error });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="addPostModal-background"
      onClick={() => setCanShowModal(false)}
    >
      <motion.form
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="addPostModal-form"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="addPostModal-title">Add a post</h1>
        <input
          type="text"
          className="input-field"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h4 className="addPostModal-form-error">{titleError}</h4>
        <textarea
          cols="20"
          rows="3"
          className="input-field"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <h4 className="addPostModal-form-error">{bodyError}</h4>
        <button className="input-button" onClick={handleAddPost}>
          Add
        </button>
        <button className="input-button" onClick={handleCloseModal}>
          Close
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AddPostModal;

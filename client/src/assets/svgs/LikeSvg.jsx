import axios from "axios";
import { motion } from "framer-motion";
import "./Svg.css";

const containerVariants = {
  hover: {
    scale: 1.2,
  },

  tap: {
    scale: 0.8,
  },
};

const LikeSvg = ({
  postId,
  hasLiked,
  setHasLiked,
  setNumberOfLikes,
  numberOfLikes,
}) => {
  const handleLikeClick = async () => {
    try {
      axios.all([
        await axios.patch(
          "http://localhost:5000/api/post/" + postId,
          {},
          { withCredentials: true }
        ),
        await axios.patch(
          "http://localhost:5000/api/user/postLiked",
          { postId, hasLiked },
          {
            withCredentials: true,
          }
        ),
      ]);

      setNumberOfLikes(hasLiked ? numberOfLikes - 1 : numberOfLikes + 1);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.log("ERROR in LikeSvg:", error);
    }
  };

  return (
    <motion.svg
      onClick={handleLikeClick}
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon svg-like"
      viewBox="-5 0 30 30"
    >
      <path
        className={hasLiked ? "svg-path-liked" : "svg-path-like"}
        d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
      />
    </motion.svg>
  );
};

export default LikeSvg;

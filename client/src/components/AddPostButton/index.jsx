import "./AddPostButton.css";
import { motion } from "framer-motion";

const AddPostButton = ({ userAuthenticated, setCanShowModal }) => {
  const showAddPostModal = () => {
    setCanShowModal(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={showAddPostModal}
      className={`addPostButton-container ${!userAuthenticated && "hide"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
      >
        <path fill="white" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </svg>
    </motion.div>
  );
};

export default AddPostButton;

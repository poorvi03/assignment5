import "./Svg.css";
import { motion } from "framer-motion";

const containerVariants = {
  hover: {
    scale: 1.2,
  },

  tap: {
    scale: 0.8,
  },
};

function SvgIcon({ path }) {
  return (
    <motion.div
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
      className="svgIcon-container"
    >
      <svg
        className="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path className="svg-icon-path" d={path} />
      </svg>
    </motion.div>
  );
}

export default SvgIcon;

import "./NotFound.css";
import "../../assets/svgs/Svg.css";
import { ErrorPathData } from "../../assets/svgs/svgPathData";

const NotFound = () => {
  return (
    <div className="notFound-container">
      <svg
        className="svg-big"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path className="svg-icon-path" d={ErrorPathData} />
      </svg>
      <h2>404 Page Not Found</h2>
    </div>
  );
};

export default NotFound;

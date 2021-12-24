import SvgIcon from "../../assets/svgs/SvgIcon";
import "./Header.css";
import { AccountPathData } from "../../assets/svgs/svgPathData";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const [icons] = useState([{ path: AccountPathData, to: "account" }]);

  return (
    <header>
      <ul className="header-list">
        <li>
          <Link to="/">
            <h1 className="header-title">Blog</h1>
          </Link>
        </li>

        {icons.map(({ path, to }, index) => (
          <li key={index}>
            <Link to={to !== undefined ? "/" + to : location.pathname}>
              <SvgIcon path={path} />
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;

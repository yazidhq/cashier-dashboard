import {
  FaConciergeBell,
  FaHome,
  FaUtensils,
  FaUserCircle,
  FaSignOutAlt,
  FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="px-4">
      <ul className="list-unstyled">
        <div className="position-fixed">
          <li className="fs-1">
            <Link
              to="/"
              className="text-decoration-none text-danger icon-xlarge"
            >
              <FaConciergeBell />
            </Link>
          </li>
          <li className="fs-2 mt-4 text-center">
            <Link to="/" className="text-decoration-none text-danger">
              <FaHome />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link to="/products" className="text-decoration-none text-danger">
              <FaUtensils />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link to="/" className="text-decoration-none text-danger">
              <FaFileAlt />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link to="/" className="text-decoration-none text-danger">
              <FaUserCircle />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link to="/" className="text-decoration-none text-danger">
              <FaSignOutAlt />
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;

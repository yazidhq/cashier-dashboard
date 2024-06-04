import {
  FaConciergeBell,
  FaHome,
  FaUtensils,
  FaSignOutAlt,
  FaFileAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const currentUrl = location.pathname;

  const handleLogout = async () => {
    await logout();
  };

  const getLinkClass = (path) => {
    return currentUrl === path ? "text-dark" : "text-danger";
  };

  return (
    <div className="px-4">
      <ul className="list-unstyled">
        <div className="position-fixed">
          <li className="fs-1">
            <Link to="/" className="text-decoration-none text-danger">
              <FaConciergeBell />
            </Link>
          </li>
          <li className="fs-2 mt-4 text-center">
            <Link
              to="/"
              className={`text-decoration-none ${getLinkClass("/")}`}
            >
              <FaHome />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link
              to="/products"
              className={`text-decoration-none ${getLinkClass("/products")}`}
            >
              <FaUtensils />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link
              to="/reports"
              className={`text-decoration-none ${getLinkClass("/reports")}`}
            >
              <FaFileAlt />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link
              to="/profile"
              className={`text-decoration-none ${getLinkClass("/profile")}`}
            >
              <FaUserCircle />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center text-danger">
            <FaSignOutAlt onClick={handleLogout} />
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;

import {
  FaConciergeBell,
  FaHome,
  FaUtensils,
  FaUserCircle,
  FaSignOutAlt,
  FaFileAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  // Fungsi untuk menentukan kelas CSS setiap tautan berdasarkan URL
  const getLinkClass = (path) => {
    return currentUrl === path ? "text-dark" : "text-danger";
  };

  return (
    <div className="px-4">
      <ul className="list-unstyled">
        <div className="position-fixed">
          <li className="fs-1">
            <Link to="/" className={`text-decoration-none text-danger`}>
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
            <Link to="" className={`text-decoration-none text-danger`}>
              <FaUserCircle />
            </Link>
          </li>
          <li className="fs-2 mt-3 text-center">
            <Link to="" className={`text-decoration-none text-danger`}>
              <FaSignOutAlt />
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;

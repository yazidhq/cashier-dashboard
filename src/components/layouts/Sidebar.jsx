import {
  FaConciergeBell,
  FaHome,
  FaUtensils,
  FaUserCircle,
  FaSignOutAlt,
  FaFileAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="px-4">
      <ul className="list-unstyled">
        <div className="position-fixed">
          <li className="fs-1">
            <a
              href="/"
              className="text-decoration-none text-danger icon-xlarge"
            >
              <FaConciergeBell />
            </a>
          </li>
          <li className="fs-2 mt-4 text-center">
            <a href="/" className="text-decoration-none text-danger">
              <FaHome />
            </a>
          </li>
          <li className="fs-2 mt-3 text-center">
            <a href="/" className="text-decoration-none text-danger">
              <FaUtensils />
            </a>
          </li>
          <li className="fs-2 mt-3 text-center">
            <a href="/" className="text-decoration-none text-danger">
              <FaFileAlt />
            </a>
          </li>
          <li className="fs-2 mt-3 text-center">
            <a href="/" className="text-decoration-none text-danger">
              <FaUserCircle />
            </a>
          </li>
          <li className="fs-2 mt-3 text-center">
            <a href="/" className="text-decoration-none text-danger">
              <FaSignOutAlt />
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;

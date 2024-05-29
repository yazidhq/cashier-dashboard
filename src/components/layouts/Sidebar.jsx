import {
  FaConciergeBell,
  FaHome,
  FaUtensils,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="px-4">
      <ul className="list-unstyled">
        <li className="mb-2 fs-1">
          <a href="/" className="text-decoration-none text-danger icon-xlarge">
            <FaConciergeBell />
          </a>
        </li>
        <li className="mb-2 fs-2 mt-4 text-center">
          <a href="/" className="text-decoration-none text-danger">
            <FaHome />
          </a>
        </li>
        <li className="mb-2 fs-2 mt-3 text-center">
          <a href="/" className="text-decoration-none text-danger">
            <FaUtensils />
          </a>
        </li>
        <li className="mb-2 fs-2 mt-3 text-center">
          <a href="/" className="text-decoration-none text-danger">
            <FaUserCircle />
          </a>
        </li>
        <li className="mb-2 fs-2 mt-3 text-center">
          <a href="/" className="text-decoration-none text-danger">
            <FaSignOutAlt />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

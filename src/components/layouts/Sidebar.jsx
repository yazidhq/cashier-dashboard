import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="px-4">
      <ul className="list-unstyled">
        <li className="mb-2 fs-1 mt-2">
          <a href="/" className="text-decoration-none text-danger">
            <FaHome />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import Sidebar from "./Sidebar";

const Section = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default Section;

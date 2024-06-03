import { useReports } from "../../context/ReportsContext";

const ReportsSearch = ({}) => {
  const { searchTerm, handleSearch } = useReports();

  return (
    <input
      type="text"
      value={searchTerm}
      className="form-control border-0"
      placeholder="Search by product name..."
      onChange={handleSearch}
      style={{ width: "300px" }}
    />
  );
};

export default ReportsSearch;

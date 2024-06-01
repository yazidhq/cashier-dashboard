import TitleMenu from "../TitleMenu";
import ReportTable from "./ReportTable";
import ReportsSearch from "./ReportsSearch";

const ReportsTable = ({
  searchTerm,
  handleSearch,
  filteredData,
  handleDetails,
  details,
}) => {
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between">
        <TitleMenu firstWord={"Sales"} lastWord={"Report"} />
        <div className="mt-3">
          <ReportsSearch searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>
      </div>
      <ReportTable
        filteredData={filteredData}
        handleDetails={handleDetails}
        details={details}
      />
    </div>
  );
};

export default ReportsTable;

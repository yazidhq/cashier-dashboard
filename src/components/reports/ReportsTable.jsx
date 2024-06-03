import TitleMenu from "../TitleMenu";
import ReportTable from "./ReportTable";
import ReportsSearch from "./ReportsSearch";

const ReportsTable = ({}) => {
  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
        <div className="mb-5">
          <div className="d-flex justify-content-between">
            <TitleMenu firstWord={"Sales"} lastWord={"Report"} />
            <div className="mt-3">
              <ReportsSearch />
            </div>
          </div>
          <ReportTable />
        </div>
      </div>
    </div>
  );
};

export default ReportsTable;

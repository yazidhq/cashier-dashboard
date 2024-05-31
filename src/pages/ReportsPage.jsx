import { useState } from "react";
import Section from "../components/layouts/Section";
import ReportsTable from "../components/reports/ReportsTable";

const ReportsPage = () => {
  const report = JSON.parse(localStorage.getItem("report"));
  const [reportOrder] = useState(report ? report : []);
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState({ status: false, date: "" });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = reportOrder
    .filter((item) =>
      item.itemsName.some((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleMouseDown = (date) => {
    setDetails({ status: true, date: date });
  };

  const handleMouseUp = (date) => {
    setDetails({ status: false, date: date });
  };

  return (
    <Section>
      <div className="w-100" style={{ paddingLeft: "3rem" }}>
        <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
          <ReportsTable
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            filteredData={filteredData}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            details={details}
          />
        </div>
      </div>
    </Section>
  );
};

export default ReportsPage;

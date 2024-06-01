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

  const handleDetails = (date) => {
    setDetails({ status: !details.status, date: date });
  };

  return (
    <Section>
      <ReportsTable
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        filteredData={filteredData}
        handleDetails={handleDetails}
        details={details}
      />
    </Section>
  );
};

export default ReportsPage;

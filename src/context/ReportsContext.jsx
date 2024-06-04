import { createContext, useContext, useEffect, useState } from "react";
import useSuccessPayment from "../hooks/useSuccessPayment";
import { useGetUser } from "./GetUserContext";
import useUserId from "../hooks/useUserId";

const ReportsContext = createContext();

export const useReports = () => useContext(ReportsContext);

export const ReportsProvider = ({ children }) => {
  const report = JSON.parse(localStorage.getItem("report")) || [];
  const [reportOrder, setReportOrder] = useState(report);

  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState({ status: false, date: "" });

  const [successPayment, setSuccessPayment] = useSuccessPayment();
  const [userId] = useUserId();

  useEffect(() => {
    localStorage.setItem("report", JSON.stringify(reportOrder));
  }, [reportOrder]);

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

  const handleSaveReport = (
    totalPrice,
    itemsName,
    itemsQty,
    changeOrder,
    changeBack
  ) => {
    setReportOrder([
      ...reportOrder,
      {
        userId: userId,
        totalPrice,
        itemsName,
        itemsQty,
        changeOrder,
        changeBack,
        date: new Date().toLocaleString() + "",
      },
    ]);
    setSuccessPayment(true);
  };

  return (
    <ReportsContext.Provider
      value={{
        handleSaveReport,
        reportOrder,
        searchTerm,
        handleSearch,
        filteredData,
        handleDetails,
        details,
        successPayment,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

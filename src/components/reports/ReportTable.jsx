import { FaFileAlt, FaEye, FaTrash } from "react-icons/fa";
import { useReports } from "../../context/ReportsContext";
import useUserId from "../../hooks/useUserId";
import LoadingSpinner from "../LoadingSpinner";

const ReportTable = ({}) => {
  const { filteredData, handleDetails, details, removeReport, isLoading } =
    useReports();
  const [userId] = useUserId();

  const renderDate = (date) => {
    return (
      <div>
        {date.split(", ")[0]}{" "}
        {!details.status || details.date !== date ? ".." : ""}
        {details.status && details.date === date && (
          <div>{date.split(", ")[1]}</div>
        )}
      </div>
    );
  };

  const renderProducts = (item) => {
    return (
      <>
        {item.itemsQty[0]} x {item.itemsName[0]}{" "}
        {!details.status || details.date !== item.date ? ".." : ""}
        {details.status &&
          details.date === item.date &&
          item.itemsName.slice(1).map((name, i) => (
            <div key={i}>
              <div>
                {item.itemsQty[i + 1]} x {name}
              </div>
            </div>
          ))}
      </>
    );
  };

  const renderCurrency = (amount) => {
    return "Rp. " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const dataReports = filteredData.map((item, index) => (
    <div key={index}>
      {item.userId === userId && (
        <div className="card border-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">{renderDate(item.date)}</div>
              <div className="col-md-2">{renderProducts(item)}</div>
              <div className="col-md-2">{renderCurrency(item.totalPrice)}</div>
              <div className="col-md-2">{renderCurrency(item.changeOrder)}</div>
              <div className="col-md-2">{renderCurrency(item.changeBack)}</div>
              <div className="col-md-2 d-flex gap-3">
                <FaEye onClick={() => handleDetails(item.date)} />
                <FaTrash onClick={() => removeReport(item.id)} />
                <FaFileAlt />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ));

  if (isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2">
      <div className="card bg-light border-bottom border-white">
        <div className="card-body">
          <div className="row fw-bold">
            <div className="col-md-2">Date Order</div>
            <div className="col-md-2">Products</div>
            <div className="col-md-2">Total Price</div>
            <div className="col-md-2">Amount Paid</div>
            <div className="col-md-2">Change Back</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
      </div>
      {dataReports}
    </div>
  );
};

export default ReportTable;

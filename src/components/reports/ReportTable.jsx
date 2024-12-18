import { FaFileAlt, FaEye, FaTrash } from "react-icons/fa";
import { useReports } from "../../context/ReportsContext";
import useUserId from "../../hooks/useUserId";
import LoadingSpinner from "../LoadingSpinner";
import { usePaginated } from "../../hooks/usePaginated";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import useRupiah from "../../hooks/useRupiah";

const ReportTable = ({}) => {
  const { filteredData, handleDetails, details, removeReport, isLoading } =
    useReports();
  const [paginatedItems, handlePageChange, itemsPerPage] = usePaginated({
    filteredData,
  });
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
    return useRupiah(amount);
  };

  const dataReports = paginatedItems.map((item, index) => (
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
      {dataReports.length != 0 ? (
        dataReports
      ) : (
        <div className="text-center mt-4">
          <p className="text-muted">
            Kickstart your order
            <Link to={"/"} className="text-decoration-none">
              <span className="fw-bold  text-danger"> transaction!</span>
            </Link>
          </p>
        </div>
      )}
      <div className="border-3 border-bottom border-white mt-2"></div>
      <Pagination
        handlePageChange={handlePageChange}
        filteredData={filteredData}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default ReportTable;

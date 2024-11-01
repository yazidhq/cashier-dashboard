import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageChange, filteredData, itemsPerPage }) => {
  return (
    <ReactPaginate
      activeClassName="pagination-active"
      breakClassName="text-danger pagination-break"
      containerClassName="pagination-container"
      marginPagesDisplayed={2}
      nextLinkClassName="text-decoration-none text-danger fw-bold pagination-next-prev"
      onPageChange={handlePageChange}
      pageCount={Math.ceil(filteredData.length / itemsPerPage)}
      pageRangeDisplayed={2}
      pageClassName="pagination-page"
      previousLinkClassName="text-decoration-none text-danger fw-bold pagination-next-prev"
    />
  );
};

export default Pagination;

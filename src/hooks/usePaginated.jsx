import { useState } from "react";

export const usePaginated = ({ filteredData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedItems = filteredData.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return [paginatedItems, handlePageChange, itemsPerPage];
};

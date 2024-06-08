import { useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return [searchTerm, handleSearch];
};

export default useSearch;

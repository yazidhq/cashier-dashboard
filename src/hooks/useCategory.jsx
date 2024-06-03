import { useState } from "react";

const useCategory = () => {
  const [showCategory, setShowCategory] = useState("all");
  const handleCategory = (category) => {
    setShowCategory(category);
  };

  return [showCategory, handleCategory];
};

export default useCategory;

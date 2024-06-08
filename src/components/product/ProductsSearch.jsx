import { useProducts } from "../../context/ProductsContext";

const ProductsSearch = ({ classes }) => {
  const { searchTerm, handleSearch } = useProducts();

  return (
    <input
      type="text"
      value={searchTerm}
      className={`form-control border-0 w-100 ${classes}`}
      placeholder="Search by name..."
      onChange={handleSearch}
    />
  );
};

export default ProductsSearch;

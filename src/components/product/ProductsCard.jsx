import ProductCard from "./ProductCard";
import TitleMenu from "../TitleMenu";
import Category from "../category/Category";
import { IoFilterOutline } from "react-icons/io5";
import { useProducts } from "../../context/ProductsContext";
import useCategory from "../../hooks/useCategory";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router-dom";

const Products = ({}) => {
  const { filteredData } = useProducts();
  const [showCategory, handleCategory] = useCategory();
  const { addOrder } = useOrder();

  const renderProducts = filteredData.map((item) => {
    return showCategory === "all" || item.category == showCategory ? (
      <ProductCard key={item.img} item={item} handleAddOrder={addOrder} />
    ) : null;
  });

  return (
    <div style={{ paddingLeft: "2.5rem" }}>
      <div
        className="flex-grow-1 px-5 pt-4 bg-light pb-1"
        style={{ minHeight: "calc(100vh)" }}
      >
        <Category handleCategory={handleCategory} showCategory={showCategory} />
        <div className="mb-5">
          <div className="d-flex justify-content-between">
            <TitleMenu firstWord={"Choose"} lastWord={"Order"} />
            <div className="mt-4 d-flex">
              <p className="mx-2">
                <IoFilterOutline />
              </p>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleCategory("all")}
              >
                show all menu
              </p>
            </div>
          </div>

          {renderProducts.length != 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {renderProducts.length != 0 ? (
                renderProducts
              ) : (
                <p>No products yet, create product now</p>
              )}
            </div>
          ) : (
            <div className="text-center mt-5">
              <p className="fs-4">Looks like your inventory is empty.</p>
              <p className="text-muted">
                Start adding awesome products
                <Link to={"/products"} className="text-decoration-none">
                  <span className="fw-bold  text-danger"> now!</span>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

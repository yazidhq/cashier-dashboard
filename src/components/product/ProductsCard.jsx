import ProductCard from "./ProductCard";
import TitleMenu from "../TitleMenu";
import Category from "../category/Category";
import { IoFilterOutline } from "react-icons/io5";
import { useProducts } from "../../context/ProductsContext";
import useCategory from "../../hooks/useCategory";
import { useOrder } from "../../context/OrderContext";

const Products = ({}) => {
  const { products } = useProducts();
  const [showCategory, handleCategory] = useCategory();
  const { addOrder } = useOrder();

  const renderProducts = products.map((item) => {
    return showCategory === "all" || item.category == showCategory ? (
      <ProductCard key={item.img} item={item} handleAddOrder={addOrder} />
    ) : null;
  });

  return (
    <div style={{ paddingLeft: "2.5rem", minWidth: "730px" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
        <Category handleCategory={handleCategory} />
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
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {renderProducts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

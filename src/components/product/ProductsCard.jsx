import ProductCard from "./ProductCard";
import TitleMenu from "../TitleMenu";
import { useState } from "react";
import Category from "../category/Category";
import { IoFilterOutline } from "react-icons/io5";

const Products = ({ handleAddOrder, showCategory, handleCategory }) => {
  const product = JSON.parse(localStorage.getItem("products"));
  const [products] = useState(product ? product : []);

  const renderProducts = products.map((item) => {
    return showCategory === "all" || item.category == showCategory ? (
      <ProductCard
        key={item.name}
        item={item}
        handleAddOrder={handleAddOrder}
      />
    ) : (
      <div key={item.name} style={{ paddingInline: "150px" }}></div>
    );
  });

  return (
    <div style={{ paddingLeft: "2.5rem" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
        <Category handleCategory={handleCategory} />
        <div className="mb-5">
          <div className="d-flex justify-content-between">
            <TitleMenu firstWord={"Choose"} lastWord={"Order"} />
            <div className="mt-4 d-flex">
              <p className="mx-2">
                <IoFilterOutline />
              </p>
              <p onClick={() => handleCategory("all")}>show all menu</p>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-3 g-4">
            {renderProducts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

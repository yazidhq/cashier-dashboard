import products from "../../../public/data/products.json";
import ProductCard from "./ProductCard";
import TitleMenu from "../TitleMenu";

const Products = ({ handleAddOrder, showCategory }) => {
  const product_list = products.product_list;

  return (
    <div className="mb-5">
      <TitleMenu firstWord={"Choose"} lastWord={"Order"} />
      <div className="row row-cols-1 row-cols-lg-3 g-4">
        {product_list.map((item) => {
          if (item.category === showCategory) {
            return (
              <ProductCard
                item={item}
                key={item.name}
                handleAddOrder={handleAddOrder}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Products;

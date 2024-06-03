import { FaEdit, FaTrash } from "react-icons/fa";
import ProductsForm from "./ProductsForm";
import category from "../../../public/data/category.json";
import { useEditButton } from "../../hooks/useButton";
import { useProducts } from "../../context/ProductsContext";
import useSkeleton from "../../hooks/useSkeleton";

const ProductTable = ({}) => {
  const { products, removeProduct, updateProduct } = useProducts();
  const [editButtonShow, handleEditButton] = useEditButton();
  const [isSkeleton, handleImageLoaded] = useSkeleton();
  const menu_category = category.menu_category;

  const renderProducts = products.map((item) => (
    <div className="card border-0" key={item.img}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-2 rounded-circle">
            <img
              src={item.img}
              onLoad={handleImageLoaded}
              className={`img-fluid ${
                isSkeleton ? "skeleton-img-product" : ""
              }`}
              width={"50px"}
            />
          </div>
          <div className="col-md-4 mt-2">{item.name}</div>
          <div className="col-md-2 mt-2">
            Rp.
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </div>
          <div className="col-md-2 mt-2">{item.qty}</div>
          <div className="col-md-2 mt-2">
            <div className="d-flex gap-3 mt-1">
              <FaEdit onClick={() => handleEditButton(item.img)} />
              <FaTrash onClick={() => removeProduct(item.img)} />
            </div>
          </div>
          {editButtonShow.status && editButtonShow.img === item.img && (
            <ProductsForm
              updateProduct={updateProduct}
              menu_category={menu_category}
              data_value={{
                name: item.name,
                category: item.category,
                price: item.price,
                qty: item.qty,
                img: item.img,
              }}
            />
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-column gap-2">
      <div className="card bg-light border-bottom border-white">
        <div className="card-body">
          <div className="row fw-bold">
            <div className="col-md-2">Image</div>
            <div className="col-md-4">Name</div>
            <div className="col-md-2">Price</div>
            <div className="col-md-2">Stocks</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
      </div>
      {renderProducts}
    </div>
  );
};

export default ProductTable;

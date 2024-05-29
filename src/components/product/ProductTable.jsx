import { FaEdit, FaTrash } from "react-icons/fa";
import ProductsForm from "./ProductsForm";
import category from "../../../public/data/category.json";

const ProductTable = ({
  showProducts,
  handleRemoveProduct,
  handleEditButton,
  editButton,
  handleUpdateProduct,
}) => {
  const menu_category = category.menu_category;

  const products = showProducts.map((item) => (
    <div className="card border-0" key={item.name}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-2 rounded-circle">
            <img
              src={`./data/img/${item.img}`}
              className="img-fluid"
              width={"50px"}
            />
          </div>
          <div className="col-md-4 mt-2">{item.name}</div>
          <div className="col-md-2 mt-2">
            Rp.
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </div>
          <div className="col-md-2 mt-2">100</div>
          <div className="col-md-2 mt-2">
            <div className="d-flex gap-3 mt-1">
              <FaEdit onClick={() => handleEditButton(item.name)} />
              <FaTrash onClick={() => handleRemoveProduct(item.name)} />
            </div>
          </div>
          {editButton.status && editButton.name === item.name && (
            <ProductsForm
              handleUpdateProduct={handleUpdateProduct}
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
      {products}
    </div>
  );
};

export default ProductTable;

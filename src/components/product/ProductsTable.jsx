import TitleMenu from "../TitleMenu";
import Button from "../Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import category from "../../../public/data/category.json";

const ProductsTable = ({
  handleAddButton,
  addButton,
  handleAddProduct,
  handleRemoveProduct,
  showProducts,
}) => {
  const menu_category = category.menu_category;

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between">
        <TitleMenu firstWord={"Product"} lastWord={"Managements"} />
        <div className="mt-2">
          <Button
            grid=""
            text={"Add new product"}
            color={"danger"}
            handleClick={handleAddButton}
          />
        </div>
      </div>

      {addButton && (
        <form
          action=""
          method="POST"
          onSubmit={handleAddProduct}
          className="mb-3"
        >
          <div className="d-flex justify-content-between gap-1 mb-1">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Product name"
              name="name"
              required
            />
            <select name="category" className="form-control" required>
              <option hidden value="">
                Select Category
              </option>
              {menu_category.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between gap-1 mb-1">
            <input
              type="number"
              className="form-control border-0"
              placeholder="Price"
              name="price"
              required
            />
            <input
              type="number"
              className="form-control border-0"
              placeholder="Stock"
              name="qty"
              required
            />
            <input
              type="file"
              className="form-control border-0"
              name="image"
              required
            />
          </div>
          <Button text={"Add product"} color={"danger"} type={"submit"} />
        </form>
      )}

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
        {showProducts.map((item) => (
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2 rounded-circle">
                  <img
                    src={`./data/img/${item.image}`}
                    className="img-fluid"
                    width={"50px"}
                  />
                </div>
                <div className="col-md-4 mt-1">{item.name}</div>
                <div className="col-md-2 mt-1">
                  Rp.
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
                <div className="col-md-2 mt-1">100</div>
                <div className="col-md-2 mt-1">
                  <div className="d-flex gap-3 mt-1">
                    <FaEdit />
                    <FaTrash onClick={() => handleRemoveProduct(item.name)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;

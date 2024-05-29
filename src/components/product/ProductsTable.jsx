import TitleMenu from "../TitleMenu";
import Button from "../Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductsTable = ({ handleAddButton, addButton }) => {
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
        <div className="d-flex justify-content-between gap-1 mb-3">
          <input type="file" className="form-control border-0" />
          <input
            type="text"
            className="form-control border-0"
            placeholder="Product name"
          />
          <input
            type="number"
            className="form-control border-0"
            placeholder="Price"
          />
          <input
            type="number"
            className="form-control border-0"
            placeholder="Stock"
          />
          <button className="btn btn-white">Add</button>
        </div>
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
        <div className="card border-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 rounded-circle">
                <img
                  src="./data/img/bubur-ayam.png"
                  className="img-fluid"
                  width={"50px"}
                />
              </div>
              <div className="col-md-4 mt-1">Bubur Ayam</div>
              <div className="col-md-2 mt-1">Rp. 25.000</div>
              <div className="col-md-2 mt-1">100</div>
              <div className="col-md-2 mt-1">
                <div className="d-flex gap-3 mt-1">
                  <FaEdit />
                  <FaTrash />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

import Button from "../Button";

const ProductsForm = ({
  handleAddProduct,
  handleUpdateProduct,
  menu_category,
  data_value,
}) => {
  return (
    <form
      action=""
      method="POST"
      onSubmit={
        handleUpdateProduct
          ? (e) => handleUpdateProduct(data_value.name, e)
          : handleAddProduct
      }
      className={`mb-3 ${handleUpdateProduct ? "mt-3" : ""}`}
    >
      <div className="d-flex justify-content-between gap-1 mb-1">
        <input
          type="text"
          className={`form-control ${handleUpdateProduct ? "" : "border-0"}`}
          placeholder="Product name"
          name="name"
          defaultValue={handleUpdateProduct ? data_value.name : ""}
          required
        />
        <select
          name="category"
          className={`form-control ${handleUpdateProduct ? "" : "border-0"}`}
          required
        >
          {handleUpdateProduct && (
            <option hidden defaultValue={data_value.category}>
              {data_value.category}
            </option>
          )}
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
          className={`form-control ${handleUpdateProduct ? "" : "border-0"}`}
          placeholder="Price"
          name="price"
          min={0}
          defaultValue={handleUpdateProduct ? data_value.price : ""}
          required
        />
        <input
          type="number"
          className={`form-control ${handleUpdateProduct ? "" : "border-0"}`}
          placeholder="Stock"
          name="qty"
          min={0}
          defaultValue={handleUpdateProduct ? data_value.qty : ""}
          required
        />
        <input
          type="file"
          className={`form-control ${handleUpdateProduct ? "" : "border-0"}`}
          name="img"
          required={!handleUpdateProduct}
        />
      </div>
      <div className="mt-3">
        <Button
          text={handleUpdateProduct ? "Update product" : "Add product"}
          color={"danger"}
          type={"submit"}
        />
      </div>
    </form>
  );
};

export default ProductsForm;

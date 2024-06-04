import Button from "../Button";

const ProductsForm = ({
  menu_category,
  data_value,
  addProduct,
  updateProduct,
}) => {
  return (
    <form
      action=""
      method="POST"
      onSubmit={
        updateProduct
          ? (e) => updateProduct(data_value.id, data_value.img, e)
          : addProduct
      }
      className={`mb-3 ${updateProduct ? "mt-3" : ""}`}
    >
      <div className="d-flex justify-content-between gap-1 mb-1">
        <input
          type="text"
          className={`form-control ${updateProduct ? "" : "border-0"}`}
          placeholder="Product name"
          name="name"
          defaultValue={updateProduct ? data_value.name : ""}
          required
        />
        <select
          name="category"
          className={`form-control ${updateProduct ? "" : "border-0"}`}
          required
        >
          {updateProduct && (
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
          className={`form-control ${updateProduct ? "" : "border-0"}`}
          placeholder="Price"
          name="price"
          min={0}
          defaultValue={updateProduct ? data_value.price : ""}
          required
        />
        <input
          type="number"
          className={`form-control ${updateProduct ? "" : "border-0"}`}
          placeholder="Stock"
          name="qty"
          min={0}
          defaultValue={updateProduct ? data_value.qty : ""}
          required
        />
        <input
          type="file"
          className={`form-control ${updateProduct ? "" : "border-0"}`}
          name="img"
          accept="image/*"
          required={!updateProduct}
        />
      </div>
      <div className="mt-3">
        <Button
          text={updateProduct ? "Update product" : "Add product"}
          color={"danger"}
          type={"submit"}
        />
      </div>
    </form>
  );
};

export default ProductsForm;

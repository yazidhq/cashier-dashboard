import Button from "../Button";

const ProductsForm = ({ handleAddProduct, menu_category }) => {
  return (
    <form action="" method="POST" onSubmit={handleAddProduct} className="mb-3">
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
  );
};

export default ProductsForm;

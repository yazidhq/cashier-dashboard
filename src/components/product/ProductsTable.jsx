import TitleMenu from "../TitleMenu";
import Button from "../Button";
import category from "../../../public/data/category.json";
import ProductTable from "./ProductTable";
import ProductsForm from "./ProductsForm";

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
        <ProductsForm
          handleAddProduct={handleAddProduct}
          menu_category={menu_category}
        />
      )}

      <ProductTable
        showProducts={showProducts}
        handleRemoveProduct={handleRemoveProduct}
      />
    </div>
  );
};

export default ProductsTable;

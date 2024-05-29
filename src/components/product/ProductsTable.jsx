import TitleMenu from "../TitleMenu";
import Button from "../Button";
import category from "../../../public/data/category.json";
import ProductTable from "./ProductTable";
import ProductsForm from "./ProductsForm";

const ProductsTable = ({
  handleAddProduct,
  handleRemoveProduct,
  handleUpdateProduct,
  showProducts,
  handleAddButton,
  addButton,
  handleShowEditFormButton,
  editButton,
}) => {
  const menu_category = category.menu_category;

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between">
        <TitleMenu firstWord={"Product"} lastWord={"Managements"} />
        <div className="mt-3">
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
        handleUpdateProduct={handleUpdateProduct}
        handleShowEditFormButton={handleShowEditFormButton}
        editButton={editButton}
      />
    </div>
  );
};

export default ProductsTable;

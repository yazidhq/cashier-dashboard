import TitleMenu from "../TitleMenu";
import Button from "../Button";
import category from "../../../public/data/category.json";
import ProductTable from "./ProductTable";
import ProductsForm from "./ProductsForm";
import LoadingSpinner from "../LoadingSpinner";

const ProductsTable = ({
  handleAddProduct,
  handleRemoveProduct,
  handleUpdateProduct,
  showProducts,
  handleAddButton,
  addButton,
  handleEditButton,
  editButton,
  isLoading,
}) => {
  const menu_category = category.menu_category;

  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
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

          {isLoading ? (
            <div className="mt-3">
              <LoadingSpinner />
            </div>
          ) : (
            <ProductTable
              showProducts={showProducts}
              handleRemoveProduct={handleRemoveProduct}
              handleUpdateProduct={handleUpdateProduct}
              handleEditButton={handleEditButton}
              editButton={editButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

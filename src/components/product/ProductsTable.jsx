import TitleMenu from "../TitleMenu";
import Button from "../Button";
import category from "../../../public/data/category.json";
import ProductTable from "./ProductTable";
import ProductsForm from "./ProductsForm";
import LoadingSpinner from "../LoadingSpinner";
import { useAddButton } from "../../hooks/useButton";
import { useProducts } from "../../context/ProductsContext";
import ProductsSearch from "./ProductsSearch";

const ProductsTable = ({}) => {
  const { isLoading, addProduct } = useProducts();
  const [addButtonShow, handleAddButton] = useAddButton();
  const menu_category = category.menu_category;

  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      <div
        className="flex-grow-1 px-5 pt-4 bg-light pb-1"
        style={{ minHeight: "calc(100vh)" }}
      >
        <div className="mb-5">
          <div className="d-flex justify-content-between">
            <TitleMenu firstWord={"Product"} lastWord={"Managements"} />
            <div className="d-flex gap-3">
              <div className="mt-3">
                <ProductsSearch />
              </div>
              <div className="mt-3">
                <Button
                  grid=""
                  text={"Add new product"}
                  color={"danger"}
                  handleClick={handleAddButton}
                />
              </div>
            </div>
          </div>

          {addButtonShow && (
            <ProductsForm
              menu_category={menu_category}
              addProduct={addProduct}
            />
          )}

          {isLoading ? (
            <div className="mt-3">
              <div className="d-flex align-item-center justify-content-center">
                <LoadingSpinner />
              </div>
            </div>
          ) : (
            <ProductTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

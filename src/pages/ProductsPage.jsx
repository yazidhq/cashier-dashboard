import { useState } from "react";
import Section from "../components/layouts/Section";
import ProductsTable from "../components/product/ProductsTable";

const ProductsPage = () => {
  const [addButtonShow, setAddButtonShow] = useState(false);

  const handleAddButton = () => {
    setAddButtonShow(!addButtonShow);
  };

  return (
    <Section>
      <div className="w-100" style={{ paddingLeft: "3rem" }}>
        <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
          <ProductsTable
            handleAddButton={handleAddButton}
            addButton={addButtonShow}
          />
        </div>
      </div>
    </Section>
  );
};

export default ProductsPage;

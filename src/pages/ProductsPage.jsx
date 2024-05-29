import { useEffect, useState } from "react";
import Section from "../components/layouts/Section";
import ProductsTable from "../components/product/ProductsTable";

const ProductsPage = () => {
  const product = JSON.parse(localStorage.getItem("products"));
  const [products, setProducts] = useState(product ? product : []);
  const [addButtonShow, setAddButtonShow] = useState(false);
  const [editButtonShow, setEditButtonShow] = useState({
    status: false,
    name: "",
  });

  console.log(editButtonShow);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: e.target.price.value,
      qty: e.target.qty.value,
      img: e.target.img.value.replace("C:\\fakepath\\", ""),
    };
    setProducts([
      ...products,
      {
        name: data.name,
        category: data.category,
        price: data.price,
        qty: data.qty,
        img: data.img,
      },
    ]);
  };

  const handleRemoveProduct = (name) => {
    const updatedProducts = products.filter((item) => item.name !== name);
    setProducts(updatedProducts);
    localStorage.setItem("order", JSON.stringify(updatedProducts));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: e.target.price.value,
      qty: e.target.qty.value,
      img: e.target.img.value.replace("C:\\fakepath\\", ""),
    };
    if (data.img === "") {
      console.log([data.name, data.category, data.price, data.qty]);
    } else {
      console.log([data.name, data.category, data.price, data.qty, data.img]);
    }
  };

  const handleAddButton = () => {
    setAddButtonShow(!addButtonShow);
  };

  const handleEditButton = (productName) => {
    setEditButtonShow({ status: !editButtonShow.status, name: productName });
  };

  return (
    <Section>
      <div className="w-100" style={{ paddingLeft: "3rem" }}>
        <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
          <ProductsTable
            handleAddButton={handleAddButton}
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct}
            handleUpdateProduct={handleUpdateProduct}
            showProducts={products}
            addButton={addButtonShow}
            handleEditButton={handleEditButton}
            editButton={editButtonShow}
          />
        </div>
      </div>
    </Section>
  );
};

export default ProductsPage;

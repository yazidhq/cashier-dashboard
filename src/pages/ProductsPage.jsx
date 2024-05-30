import { useEffect, useState } from "react";
import Section from "../components/layouts/Section";
import ProductsTable from "../components/product/ProductsTable";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const product = JSON.parse(localStorage.getItem("products"));
  const [products, setProducts] = useState(product ? product : []);
  const [addButtonShow, setAddButtonShow] = useState(false);
  const [editButtonShow, setEditButtonShow] = useState({
    status: false,
    name: "",
  });

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

    Swal.fire("Added!", "Product have been created successfully", "success");
  };

  const handleRemoveProduct = (name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducts = products.filter((item) => item.name !== name);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  const handleUpdateProduct = (name, e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: e.target.price.value,
      qty: e.target.qty.value,
      img: e.target.img.value.replace("C:\\fakepath\\", ""),
    };

    const updatedProducts = products.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          name: data.name,
          category: data.category,
          price: data.price,
          qty: data.qty,
          img: data.img === "" ? item.img : data.img,
        };
      }
      return item;
    });

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    Swal.fire("Updated!", "Your product has been updated.", "success");
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

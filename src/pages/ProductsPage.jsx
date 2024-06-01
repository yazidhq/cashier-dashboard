import { useEffect, useState } from "react";
import Section from "../components/layouts/Section";
import ProductsTable from "../components/product/ProductsTable";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/firebaseUtils";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase-config";

const ProductsPage = () => {
  const product = JSON.parse(localStorage.getItem("products"));
  const [products, setProducts] = useState(product ? product : []);
  const [isLoading, setIsLoading] = useState(false);
  const [addButtonShow, setAddButtonShow] = useState(false);
  const [editButtonShow, setEditButtonShow] = useState({
    status: false,
    img: "",
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imageFile = e.target.img.files[0];
    const imageUrl = await uploadImage(imageFile);
    if (imageUrl) {
      const data = {
        name: e.target.name.value,
        category: e.target.category.value,
        price: e.target.price.value,
        qty: e.target.qty.value,
        img: imageUrl,
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
      setIsLoading(false);
      Swal.fire("Added!", "Product have been created successfully", "success");
    } else {
      setIsLoading(false);
      Swal.fire("Error!", "Failed to upload image", "error");
    }
  };

  const handleRemoveProduct = async (imageUrl) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedProducts = products.filter(
          (item) => item.img !== imageUrl
        );
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        try {
          const storageRef = ref(storage, imageUrl);
          await deleteObject(storageRef);
          console.log("Image deleted successfully");
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting image: ", error);
          Swal.fire("Error!", "Failed to delete image", "error");
        }
      }
    });
  };

  const handleUpdateProduct = async (name, e) => {
    e.preventDefault();
    setIsLoading(true);
    const imageFile = e.target.img.files[0];
    let imageUrl = e.target.img.value.replace("C:\\fakepath\\", "");
    let oldImageUrl = "";

    const oldProduct = products.find((item) => item.name === name);
    if (oldProduct) {
      oldImageUrl = oldProduct.img;
    }

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        const oldImageRef = ref(storage, oldImageUrl);
        deleteObject(oldImageRef)
          .then(() => {
            console.log("Old image deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting old image: ", error);
            if (error.code === "storage/object-not-found") {
              console.log(
                "Image not found in storage, might have been deleted earlier."
              );
            }
          });
      } else {
        setIsLoading(false);
        Swal.fire("Error!", "Failed to upload new image", "error");
        return;
      }
    }

    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: e.target.price.value,
      qty: e.target.qty.value,
      img: imageUrl,
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

    setIsLoading(false);
    Swal.fire("Updated!", "Your product has been updated.", "success");
  };

  const handleAddButton = () => {
    setAddButtonShow(!addButtonShow);
  };

  const handleEditButton = (productImg) => {
    setEditButtonShow({ status: !editButtonShow.status, img: productImg });
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
            isLoading={isLoading}
          />
        </div>
      </div>
    </Section>
  );
};

export default ProductsPage;

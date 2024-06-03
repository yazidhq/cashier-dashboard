import { createContext, useContext, useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import { uploadImage } from "../utils/firebaseUtils";
import Swal from "sweetalert2";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase-config";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const [products, setProducts] = useState(storedProducts);
  const [isLoading, setIsLoading] = useLoading();

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = async (e) => {
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

  const removeProduct = async (imageUrl) => {
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

  const updateProduct = async (img, e) => {
    e.preventDefault();
    setIsLoading(true);
    const imageFile = e.target.img.files[0];
    let imageUrl = e.target.img.value.replace("C:\\fakepath\\", "");
    let oldImageUrl = "";

    const oldProduct = products.find((item) => item.img === img);
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
      if (item.img === img) {
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
    setIsLoading(false);

    Swal.fire("Updated!", "Your product has been updated.", "success");
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

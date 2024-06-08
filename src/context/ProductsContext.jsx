import { createContext, useContext, useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import { uploadImage } from "../utils/firebaseUtils";
import Swal from "sweetalert2";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import useUserId from "../hooks/useUserId";
import useSearch from "../hooks/useSearch";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useLoading();
  const [searchTerm, handleSearch] = useSearch();
  const [userId] = useUserId();

  useEffect(() => {
    const q = query(collection(db, "products"));
    const shapShot = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      },
      () => {
        console.log("Youre not logged in yet");
      }
    );
    return () => shapShot();
  }, []);

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
      await addDoc(collection(db, "products"), {
        userId: userId,
        name: data.name,
        category: data.category,
        price: data.price,
        qty: data.qty,
        img: data.img,
      });
      setIsLoading(false);
      Swal.fire("Added!", "Product have been created successfully", "success");
    } else {
      setIsLoading(false);
      Swal.fire("Error!", "Failed to upload image", "error");
    }
  };

  const removeProduct = async (id, imageUrl) => {
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
        setIsLoading(true);
        try {
          const storageRef = ref(storage, imageUrl);
          const productsDocRef = doc(db, "products", id);
          await deleteObject(storageRef);
          await deleteDoc(productsDocRef);
          setIsLoading(false);
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          setIsLoading(false);
          Swal.fire("Error!", "Failed to delete image", "error");
        }
      }
    });
  };

  const updateProduct = async (id, img, e) => {
    e.preventDefault();
    setIsLoading(true);
    const imageFile = e.target.img.files[0];
    let imageUrl = img;

    const oldProduct = products.find((item) => item.id === id);
    const oldImageUrl = oldProduct ? oldProduct.img : "";

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

    const productDocRef = doc(db, "products", id);
    try {
      await updateDoc(productDocRef, data);

      const updatedProducts = products.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
      setProducts(updatedProducts);

      setIsLoading(false);
      Swal.fire("Updated!", "Your product has been updated.", "success");
    } catch (err) {
      setIsLoading(false);
      Swal.fire("Failed!", "Failed to update the product.", "error");
    }
  };

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        removeProduct,
        updateProduct,
        searchTerm,
        handleSearch,
        filteredData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

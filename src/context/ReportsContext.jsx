import { createContext, useContext, useEffect, useState } from "react";
import useUserId from "../hooks/useUserId";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Swal from "sweetalert2";
import { useOrder } from "./OrderContext";
import useSearch from "../hooks/useSearch";
import { useProducts } from "./ProductsContext";

const ReportsContext = createContext();

export const useReports = () => useContext(ReportsContext);

export const ReportsProvider = ({ children }) => {
  const [searchTerm, handleSearch] = useSearch();
  const [reportOrder, setReportOrder] = useState([]);
  const [details, setDetails] = useState({ status: false, date: "" });
  const { successPayment, setSuccessPayment, isLoading, setIsLoading } =
    useOrder();
  const { products } = useProducts();
  const [userId] = useUserId();

  useEffect(() => {
    const q = query(collection(db, "reports"));
    const snapShot = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedReports = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReportOrder(fetchedReports);
      },
      () => {
        console.log("Youre not logged in yet");
      }
    );
    return () => snapShot();
  }, []);

  const filteredData = reportOrder
    .filter((item) =>
      item.itemsName.some((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDetails = (date) => {
    setDetails({ status: !details.status, date: date });
  };

  const handleSaveReport = async (
    totalPrice,
    itemsId,
    itemsName,
    itemsQty,
    changeOrder,
    changeBack
  ) => {
    setSuccessPayment(false);
    setIsLoading(true);
    try {
      await addDoc(collection(db, "reports"), {
        userId: userId,
        totalPrice,
        itemsName,
        itemsQty,
        changeOrder,
        changeBack,
        date: new Date().toLocaleString() + "",
      });

      const productOrder = products.filter((item) => itemsId.includes(item.id));
      const prdctqty = productOrder.map((product) => product.qty);
      const orderqty = itemsQty;

      if (prdctqty.length !== orderqty.length) {
        console.error("Arrays must be of the same length");
      } else {
        const results = prdctqty.map((qty, index) =>
          (qty - orderqty[index]).toString()
        );
        for (let i = 0; i < itemsId.length; i++) {
          const productDocRef = doc(db, "products", itemsId[i]);
          await updateDoc(productDocRef, { qty: results[i] });
        }
      }

      setSuccessPayment(true);
      setIsLoading(false);
    } catch (err) {
      setSuccessPayment(false);
      setIsLoading(false);
      Swal.fire("Failed!", "The receipt has been failed created");
    }
  };

  const removeReport = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "reports", id));
          setIsLoading(false);
          Swal.fire("Deleted!", "Your report has been deleted.", "success");
        } catch (err) {
          Swal.fire("Failed!", "Your report has been delete failed.", "error");
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <ReportsContext.Provider
      value={{
        handleSaveReport,
        removeReport,
        reportOrder,
        searchTerm,
        handleSearch,
        filteredData,
        handleDetails,
        details,
        successPayment,
        isLoading,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

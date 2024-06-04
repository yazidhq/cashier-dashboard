import { createContext, useContext, useEffect, useState } from "react";
import useSuccessPayment from "../hooks/useSuccessPayment";
import useUserId from "../hooks/useUserId";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";
import useLoading from "../hooks/useLoading";
import Swal from "sweetalert2";
import { useOrder } from "./OrderContext";

const ReportsContext = createContext();

export const useReports = () => useContext(ReportsContext);

export const ReportsProvider = ({ children }) => {
  const [reportOrder, setReportOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState({ status: false, date: "" });
  const { successPayment, setSuccessPayment, isLoading, setIsLoading } =
    useOrder();
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
      setSuccessPayment(true);
      setIsLoading(false);
    } catch {
      setSuccessPayment(false);
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

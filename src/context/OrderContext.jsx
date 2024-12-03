import { createContext, useContext, useEffect, useState } from "react";
import { useProducts } from "./ProductsContext";
import useSuccessPayment from "../hooks/useSuccessPayment";
import useLoading from "../hooks/useLoading";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { products } = useProducts();
  const [successPayment, setSuccessPayment] = useSuccessPayment();
  const [isLoading, setIsLoading] = useLoading();
  const order = JSON.parse(localStorage.getItem("order")) || [];
  const [orderMenu, setOrderMenu] = useState(order);
  const [orderButton, setOrderButton] = useState(false);
  const [changeOrder, setChangeOrder] = useState();
  const { logout } = useAuth();

  useEffect(() => {
    setOrderMenu([]);
  }, [logout]);

  useEffect(() => {
    if (products.length <= 0) {
      setOrderMenu([]);
    }
  }, [localStorage.getItem("order")]);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderMenu));
  }, [orderMenu]);

  const addOrder = (id, img, name, category, price) => {
    const data = {
      id,
      img,
      name,
      category,
      price,
      qty: 1,
    };
    if (orderMenu.find((item) => item.id === data.id)) {
      setOrderMenu(
        orderMenu.map((item) =>
          item.id === data.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setOrderMenu([
        ...orderMenu,
        {
          id: data.id,
          img: data.img,
          name: data.name,
          category: data.category,
          price: data.price,
          qty: data.qty,
        },
      ]);
    }
  };

  const cancelOrder = () => {
    localStorage.removeItem("order");
    setOrderMenu([]);
    setOrderButton(false);
    setChangeOrder();
    setSuccessPayment(false);
  };

  const cancelSingleOrder = (img) => {
    const updatedOrderMenu = orderMenu.filter((item) => item.img !== img);
    setOrderMenu(updatedOrderMenu);
    setOrderButton(false);
    setChangeOrder();
    setSuccessPayment(false);
    localStorage.setItem("order", JSON.stringify(updatedOrderMenu));
  };

  const handleOrderButton = () => {
    setOrderButton(!orderButton);
  };

  const handleChange = (nominal) => {
    setChangeOrder(nominal);
  };

  const handleDoneButtonPayment = () => {
    setOrderMenu([]);
    setOrderButton(false);
    setChangeOrder();
    setSuccessPayment(false);
  };

  const totalPrice = orderMenu.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const taxPrice = totalPrice * 0.05;

  return (
    <OrderContext.Provider
      value={{
        setOrderMenu,
        addOrder,
        orderMenu,
        totalPrice,
        taxPrice,
        cancelOrder,
        cancelSingleOrder,
        handleOrderButton,
        orderButton,
        handleChange,
        changeOrder,
        handleDoneButtonPayment,
        successPayment,
        setSuccessPayment,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

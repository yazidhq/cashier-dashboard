import { createContext, useContext, useEffect, useState } from "react";
import { useProducts } from "./ProductsContext";
import useSuccessPayment from "../hooks/useSuccessPayment";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { products } = useProducts();
  const [, setSuccessPayment] = useSuccessPayment();

  const order = JSON.parse(localStorage.getItem("order")) || [];
  const [orderMenu, setOrderMenu] = useState(order);
  const [orderButton, setOrderButton] = useState(false);
  const [changeOrder, setChangeOrder] = useState();

  useEffect(() => {
    if (products.length === 0) {
      setOrderMenu([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderMenu));
  }, [orderMenu]);

  const addOrder = (img, name, category, price) => {
    const data = {
      img,
      name,
      category,
      price,
      qty: 1,
    };
    if (orderMenu.find((item) => item.img === data.img)) {
      setOrderMenu(
        orderMenu.map((item) =>
          item.img === data.img ? { ...item, qty: item.qty + 1 } : item
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
  };

  const cancelSingleOrder = (name) => {
    const updatedOrderMenu = orderMenu.filter((item) => item.name !== name);
    setOrderMenu(updatedOrderMenu);
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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

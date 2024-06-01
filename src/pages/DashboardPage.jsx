import { useEffect, useState } from "react";
import Category from "../components/category/Category";
import ProductsCard from "../components/product/ProductsCard";
import Orders from "../components/orders/Orders";
import Section from "../components/layouts/Section";

const DashboardPage = () => {
  const order = JSON.parse(localStorage.getItem("order"));
  const [orderMenu, setOrderMenu] = useState(order || []);

  const [showCategory, setShowCategory] = useState("all");
  const [orderButton, setOrderButton] = useState(false);
  const [changeOrder, setChangeOrder] = useState();

  const report = JSON.parse(localStorage.getItem("report"));
  const [reportOrder, setReportOrder] = useState(report || []);

  const [successPayment, setSuccessPayment] = useState(false);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products.length === 0) {
      setOrderMenu([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderMenu));
  }, [orderMenu]);

  useEffect(() => {
    localStorage.setItem("report", JSON.stringify(reportOrder));
  }, [reportOrder]);

  const handleAddOrder = (img, name, category, price) => {
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

  const handleCancelOrder = () => {
    localStorage.removeItem("order");
    setOrderMenu([]);
  };

  const handleCancelSingleOrder = (name) => {
    const updatedOrderMenu = orderMenu.filter((item) => item.name !== name);
    setOrderMenu(updatedOrderMenu);
    localStorage.setItem("order", JSON.stringify(updatedOrderMenu));
  };

  const handleCategory = (category) => {
    setShowCategory(category);
  };

  const handleOrderButton = () => {
    setOrderButton(!orderButton);
  };

  const handleChange = (nominal) => {
    setChangeOrder(nominal);
  };

  const handleSaveReport = (
    totalPrice,
    itemsName,
    itemsQty,
    changeOrder,
    changeBack
  ) => {
    setReportOrder([
      ...reportOrder,
      {
        totalPrice,
        itemsName,
        itemsQty,
        changeOrder,
        changeBack,
        date: new Date().toLocaleString() + "",
      },
    ]);
    setSuccessPayment(true);
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
    <Section>
      <ProductsCard
        showCategory={showCategory}
        handleAddOrder={handleAddOrder}
        handleCategory={handleCategory}
      />

      <Orders
        orderMenu={orderMenu}
        totalPrice={totalPrice}
        taxPrice={taxPrice}
        handleCancelOrder={handleCancelOrder}
        handleCancelSingleOrder={handleCancelSingleOrder}
        orderButton={handleOrderButton}
        isOrderButtonClick={orderButton}
        handleChange={handleChange}
        changeOrder={changeOrder}
        handleSaveReport={handleSaveReport}
        successPayment={successPayment}
        handleDoneButtonPayment={handleDoneButtonPayment}
      />
    </Section>
  );
};

export default DashboardPage;

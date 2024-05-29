import { useEffect, useState } from "react";
import Category from "../components/category/Category";
import Products from "../components/product/Products";
import Orders from "../components/orders/Orders";
import Section from "../components/layouts/Section";

const DashboardPage = () => {
  const order = JSON.parse(localStorage.getItem("order"));
  const [orderMenu, setOrderMenu] = useState(order ? order : []);
  const [showCategory, setShowCategory] = useState("Brunch");

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderMenu));
  }, [orderMenu]);

  const handleAddOrder = (name, category, price) => {
    const data = {
      name,
      category,
      price,
      qty: 1,
    };
    if (orderMenu.find((item) => item.name === data.name)) {
      setOrderMenu(
        orderMenu.map((item) =>
          item.name === data.name ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setOrderMenu([
        ...orderMenu,
        {
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          qty: data.qty,
        },
      ]);
    }
  };

  const handleCancelOrder = () => {
    localStorage.clear();
    setOrderMenu([]);
  };

  const handleCancelSingleOrder = (name) => {
    const updatedOrderMenu = orderMenu.filter((item) => item.name !== name);
    setOrderMenu(updatedOrderMenu);
    localStorage.setItem("order", JSON.stringify(updatedOrderMenu));
  };

  const totalPrice = orderMenu.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const taxPrice = totalPrice * 0.05;

  const handleCategory = (category) => {
    setShowCategory(category);
  };

  return (
    <Section>
      <div style={{ paddingLeft: "3rem" }}>
        <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
          <Category handleCategory={handleCategory} />
          <Products
            showCategory={showCategory}
            handleAddOrder={handleAddOrder}
          />
        </div>
      </div>
      <Orders
        orderMenu={orderMenu}
        totalPrice={totalPrice}
        taxPrice={taxPrice}
        handleCancelOrder={handleCancelOrder}
        handleCancelSingleOrder={handleCancelSingleOrder}
      />
    </Section>
  );
};

export default DashboardPage;

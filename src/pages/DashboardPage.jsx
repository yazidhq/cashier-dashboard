import { FaHome } from "react-icons/fa";
import category from "../../public/data/category.json";
import products from "../../public/data/products.json";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import TitleMenu from "../components/TitleMenu";
import Button from "../components/Button";
import OrderMenu from "../components/OrderMenu";
import OrderTotal from "../components/OrderTotal";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const product_list = products.product_list;
  const menu_category = category.menu_category;

  const order = JSON.parse(localStorage.getItem("order"));
  const [orderMenu, setOrderMenu] = useState(order ? order : []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderMenu));
  }, [orderMenu]);

  const handleAddOrder = (name, price) => {
    const data = {
      name,
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
        { id: data.id, name: data.name, price: data.price, qty: data.qty },
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

  return (
    <div className="d-flex">
      <div className="px-4">
        <ul className="list-unstyled">
          <li className="mb-2 fs-1 mt-2">
            <a href="/" className="text-decoration-none text-danger">
              <FaHome />
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 px-5 pt-3 bg-light">
        <div className="mb-5">
          <TitleMenu firstWord={"Menu"} lastWord={"Category"} />
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {menu_category.map((item) => (
              <CategoryCard item={item} key={item} />
            ))}
          </div>
        </div>
        <div className="mb-5">
          <TitleMenu firstWord={"Choose"} lastWord={"Order"} />
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {product_list.map((item) => (
              <ProductCard
                item={item}
                key={item.name}
                handleAddOrder={handleAddOrder}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 pt-3" style={{ flex: "0 0 400px" }}>
        <TitleMenu firstWord={"Order"} lastWord={"Menu"} />
        {orderMenu.map((item) => (
          <OrderMenu
            key={item.name}
            name={item.name}
            img={item.name.replace(/\s+/g, "-").toLowerCase()}
            price={item.price}
            qty={item.qty}
            cancel={() => handleCancelSingleOrder(item.name)}
          />
        ))}

        {totalPrice !== 0 && (
          <>
            <hr />
            <OrderTotal price={totalPrice} tax={taxPrice} />
            <Button text={"Order"} color={"danger"} />
            <Button
              text={"cancel order"}
              color={""}
              handleCancel={handleCancelOrder}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

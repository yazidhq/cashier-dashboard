import Button from "../Button";
import OrderTotal from "./OrderTotal";
import TitleMenu from "../TitleMenu";
import OrderMenu from "./OrderMenu";
import OrderModal from "./OrderModal";
import { useOrder } from "../../context/OrderContext";

const Orders = ({}) => {
  const {
    orderMenu,
    totalPrice,
    cancelOrder,
    cancelSingleOrder,
    handleOrderButton,
    orderButton,
    changeOrder,
  } = useOrder();

  const orders = orderMenu.map((item) => (
    <OrderMenu
      key={item.img}
      name={item.name}
      img={item.img}
      price={item.price}
      qty={item.qty}
      cancel={() => cancelSingleOrder(item.img)}
    />
  ));

  const totalPriceOrder = totalPrice !== 0 && (
    <div>
      <hr />
      <OrderTotal />

      <Button text={"Order"} color={"danger"} handleClick={handleOrderButton} />

      {orderButton && (
        <OrderModal
          changeOrder={changeOrder}
          orderItemsName={orderMenu.map((item) => item.name)}
          orderItemsQty={orderMenu.map((item) => item.qty)}
        />
      )}

      <Button text={"cancel order"} color={""} handleClick={cancelOrder} />
    </div>
  );

  return (
    <div className="px-5 pt-3" style={{ flex: "0 0 400px" }}>
      <TitleMenu firstWord={"Order"} lastWord={"Menu"} />
      {orders}
      {totalPriceOrder}
    </div>
  );
};

export default Orders;

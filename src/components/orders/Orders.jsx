import Button from "../Button";
import OrderTotal from "./OrderTotal";
import TitleMenu from "../TitleMenu";
import OrderMenu from "./OrderMenu";
import OrderModal from "./OrderModal";

const Orders = ({
  orderMenu,
  totalPrice,
  taxPrice,
  handleCancelOrder,
  handleCancelSingleOrder,
  orderButton,
  isOrderButtonClick,
  handleChange,
  changeOrder,
  handleSaveReport,
  successPayment,
  handleDoneButtonPayment,
}) => {
  const orders = orderMenu.map((item) => (
    <OrderMenu
      key={item.name}
      name={item.name}
      img={item.img}
      price={item.price}
      qty={item.qty}
      cancel={() => handleCancelSingleOrder(item.name)}
    />
  ));

  const totalPriceOrder = totalPrice !== 0 && (
    <div>
      <hr />
      <OrderTotal price={totalPrice} tax={taxPrice} />

      <Button text={"Order"} color={"danger"} handleClick={orderButton} />

      {isOrderButtonClick && (
        <OrderModal
          orderButton={orderButton}
          totalPrice={totalPrice}
          taxPrice={taxPrice}
          handleChange={handleChange}
          changeOrder={changeOrder}
          handleSaveReport={handleSaveReport}
          orderItemsName={orderMenu.map((item) => item.name)}
          orderItemsQty={orderMenu.map((item) => item.qty)}
          successPayment={successPayment}
          handleDoneButtonPayment={handleDoneButtonPayment}
        />
      )}

      <Button
        text={"cancel order"}
        color={""}
        handleClick={handleCancelOrder}
      />
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

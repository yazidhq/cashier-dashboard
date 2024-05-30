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
}) => {
  const orders = orderMenu.map((item) => (
    <OrderMenu
      key={item.name}
      name={item.name}
      img={item.name.replace(/\s+/g, "-").toLowerCase()}
      price={item.price}
      qty={item.qty}
      cancel={() => handleCancelSingleOrder(item.name)}
    />
  ));

  return (
    <div className="px-5 pt-3" style={{ flex: "0 0 400px" }}>
      <TitleMenu firstWord={"Order"} lastWord={"Menu"} />
      {orders}
      {totalPrice !== 0 && (
        <>
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
            />
          )}

          <Button
            text={"cancel order"}
            color={""}
            handleClick={handleCancelOrder}
          />
        </>
      )}
    </div>
  );
};

export default Orders;

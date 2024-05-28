import Button from "../Button";
import OrderTotal from "./OrderTotal";
import TitleMenu from "../TitleMenu";
import OrderMenu from "./OrderMenu";

const Orders = ({
  orderMenu,
  totalPrice,
  taxPrice,
  handleCancelOrder,
  handleCancelSingleOrder,
}) => {
  return (
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
  );
};

export default Orders;

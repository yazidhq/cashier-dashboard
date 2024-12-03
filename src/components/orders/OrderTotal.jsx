import { useOrder } from "../../context/OrderContext";
import useRupiah from "../../hooks/useRupiah";

const OrderTotal = ({}) => {
  const { totalPrice, taxPrice, changeOrder } = useOrder();

  return (
    <div className=" mb-5">
      <div className="d-flex justify-item-between">
        <div>
          <span>Sub Total</span>
          <br />
          <span>Tax (5%)</span>
          <br />
          <span className="fw-bold">Total</span>
        </div>
        <div className="ms-auto">
          <span>{useRupiah(totalPrice)}</span>
          <br />
          <span>{useRupiah(taxPrice)}</span>
          <br />
          <span className="fw-bold">{useRupiah(totalPrice + taxPrice)}</span>
        </div>
      </div>
      <hr />
      {changeOrder && (
        <div className="d-flex justify-item-between">
          <div>
            <span>Amount</span>
            <br />
            <span className="fw-bold">Change</span>
          </div>
          <div className="ms-auto">
            <span>{useRupiah(changeOrder)}</span>
            <br />
            <span className="fw-bold">
              {useRupiah(changeOrder - (totalPrice + taxPrice))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTotal;

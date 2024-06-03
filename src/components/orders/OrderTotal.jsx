import { useOrder } from "../../context/OrderContext";

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
          <span>
            Rp. {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <br />
          <span>
            Rp. {taxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <br />
          <span className="fw-bold">
            Rp.{" "}
            {(totalPrice + taxPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
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
            <span>
              Rp. {changeOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
            <br />
            <span className="fw-bold">
              Rp.{" "}
              {(changeOrder - (totalPrice + taxPrice))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTotal;

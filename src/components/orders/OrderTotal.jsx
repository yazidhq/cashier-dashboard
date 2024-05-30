const OrderTotal = ({ price, tax, changeOrder }) => {
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
            Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <br />
          <span>
            Rp. {tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <br />
          <span className="fw-bold">
            Rp. {(price + tax).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
              {(changeOrder - (price + tax))
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

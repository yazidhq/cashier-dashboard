const OrderTotal = ({ price, tax }) => {
  return (
    <div className="d-flex justify-item-between mb-5">
      <div>
        <span>Sub Total</span>
        <br />
        <span>Tax (5%)</span>
        <br />
        <span className="fw-bold">Sub Total</span>
      </div>
      <div className="ms-auto">
        <span>
          Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </span>
        <br />
        <span>Rp. {tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
        <br />
        <span className="fw-bold">
          Rp. {(price + tax).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </span>
      </div>
    </div>
  );
};

export default OrderTotal;

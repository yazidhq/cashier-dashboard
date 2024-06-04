const OrderMenu = ({ name, img, price, qty, cancel = () => {} }) => {
  return (
    <div className="row g-3 mb-5">
      <div className="col-md-3">
        <img src={img} className="img-fluid" onClick={cancel} />
      </div>
      <div className="fs-6 col-md-5">
        <div className="fw-bold">{name}</div>
        <span className="text-muted">
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </span>
      </div>
      <div className="col-md-1">
        <p className="fs-6 text-center">x{qty}</p>
      </div>
      <div className="col-md-3">
        <div className="fw-bold fs-6">
          {(price * qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </div>
      </div>
    </div>
  );
};

export default OrderMenu;

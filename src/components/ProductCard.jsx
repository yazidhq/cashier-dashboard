const ProductCard = ({ item }) => {
  return (
    <div className="col">
      <div className="card border-0 h-100 d-flex flex-column">
        <div className="card-body text-center d-flex flex-column">
          <div className="d-flex flex-grow-1 align-items-center justify-content-center">
            <img
              src={`./data/${item.img}`}
              className="img-fluid"
              alt={item.name}
            />
          </div>
          <div className="mt-auto">
            <div className="fs-6 fw-bold py-2">{item.name}</div>
            <span className="text-muted">
              Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

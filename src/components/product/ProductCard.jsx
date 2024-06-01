import { useState } from "react";

const ProductCard = ({ item, handleAddOrder }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleClick = () => {
    handleAddOrder(item.img, item.name, item.category, item.price);
  };

  return (
    <form action="" method="POST" onClick={handleClick} className="col">
      <div className="card card-v2 border-0 h-100 d-flex flex-column">
        <div className="card-body text-center d-flex flex-column">
          <div className="d-flex flex-grow-1 align-items-center justify-content-center">
            <img
              src={item.img}
              onLoad={handleImageLoaded}
              className={`img-fluid ${isLoading ? "skeleton-img" : ""}`}
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
    </form>
  );
};

export default ProductCard;

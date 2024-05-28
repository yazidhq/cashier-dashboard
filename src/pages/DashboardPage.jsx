import {
  FaHome,
  FaUtensils,
  FaCoffee,
  FaMugHot,
  FaHamburger,
} from "react-icons/fa";

import category from "../../public/data/category.json";
import products from "../../public/data/products.json";

const DashboardPage = () => {
  const product_list = products.product_list;
  const menu_category = category.menu_category;

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "Brunch":
        return <FaUtensils />;
      case "Hot":
        return <FaMugHot />;
      case "Cold":
        return <FaCoffee />;
      case "Snacks":
        return <FaHamburger />;
      default:
        return "";
    }
  };

  return (
    <div className="d-flex">
      <div className="px-4">
        <ul className="list-unstyled">
          <li className="mb-2 fs-1 mt-2">
            <a href="/" className="text-decoration-none text-danger">
              <FaHome />
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 px-5 pt-3 bg-light">
        <div className="mb-5">
          <p className="fs-1 mb-4">
            <span className="fw-bold">Menu</span> Category
          </p>
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {menu_category.map((item) => (
              <div className="col" key={item}>
                <div className="card border-0">
                  <div className="card-body text-center">
                    <div className="fs-1 mb-3">{getCategoryIcon(item)}</div>
                    <h5 className="card-title">{item}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <p className="fs-1 mb-4">
            <span className="fw-bold">Choose</span> Order
          </p>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {product_list.map((item) => (
              <div className="col" key={item.name}>
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
                        Rp.{" "}
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pt-3 fixed-right" style={{ flex: "0 0 400px" }}>
        <ul className="list-unstyled">
          <li className="mb-2 fs-1 mt-2">
            <p className="fs-3">
              <span className="fw-bold">Order</span> Menu
            </p>
          </li>
        </ul>
        <div className="d-grid mt-5">
          <button className="btn btn-danger">Order</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import { FaHome } from "react-icons/fa";
import category from "../../public/data/category.json";
import products from "../../public/data/products.json";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import TitleMenu from "../components/TitleMenu";
import Button from "../components/Button";

const DashboardPage = () => {
  const product_list = products.product_list;
  const menu_category = category.menu_category;

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
          <TitleMenu firstWord={"Menu"} lastWord={"Category"} />
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {menu_category.map((item) => (
              <CategoryCard item={item} key={item} />
            ))}
          </div>
        </div>
        <div className="mb-5">
          <TitleMenu firstWord={"Choose"} lastWord={"Order"} />
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {product_list.map((item) => (
              <ProductCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 pt-3" style={{ flex: "0 0 400px" }}>
        <TitleMenu firstWord={"Order"} lastWord={"Menu"} />
        <Button text={"Order"} color={"danger"} />
      </div>
    </div>
  );
};

export default DashboardPage;

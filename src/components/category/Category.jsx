import category from "../../../public/data/category.json";
import CategoryCard from "./CategoryCard";
import TitleMenu from "../TitleMenu";
import ProductsSearch from "../product/ProductsSearch";

const Category = ({ handleCategory, showCategory }) => {
  const menu_category = category.menu_category;

  const categories = menu_category.map((item) => (
    <CategoryCard
      item={item}
      key={item}
      handleCategory={() => handleCategory(item)}
      showCategory={showCategory}
    />
  ));

  return (
    <div className="mb-5">
      <div className="row">
        <div className="col-lg-6">
          <TitleMenu firstWord={"Menu"} lastWord={"Category"} />
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
          <ProductsSearch classes={"mt-3 mb-5"} />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-3">{categories}</div>
    </div>
  );
};

export default Category;

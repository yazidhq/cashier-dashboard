import category from "../../../public/data/category.json";
import CategoryCard from "./CategoryCard";
import TitleMenu from "../TitleMenu";

const Category = ({ handleCategory }) => {
  const menu_category = category.menu_category;

  return (
    <div className="mb-5">
      <TitleMenu firstWord={"Menu"} lastWord={"Category"} />
      <div className="row row-cols-1 row-cols-md-4 g-3">
        {menu_category.map((item) => (
          <CategoryCard
            item={item}
            key={item}
            handleCategory={() => handleCategory(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;

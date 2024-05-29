import { FaUtensils, FaCoffee, FaMugHot, FaHamburger } from "react-icons/fa";

const CategoryCard = ({ item, handleCategory = () => {} }) => {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "Brunch":
        return <FaUtensils />;
      case "Hot":
        return <FaMugHot />;
      case "Cold":
        return <FaCoffee />;
      case "Snack":
        return <FaHamburger />;
      default:
        return "";
    }
  };

  return (
    <div className="col" onClick={handleCategory}>
      <div className="card card-v2 border-0">
        <div className="card-body text-center">
          <div className="fs-1 mb-3">{getCategoryIcon(item)}</div>
          <h5 className="card-title">{item}</h5>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

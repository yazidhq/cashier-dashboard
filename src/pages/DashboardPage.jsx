import ProductsCard from "../components/product/ProductsCard";
import Orders from "../components/orders/Orders";
import Section from "../components/layouts/Section";

const DashboardPage = () => {
  return (
    <Section>
      <div style={{ width: "70%" }}>
        <ProductsCard />
      </div>
      <div style={{ width: "30%" }}>
        <Orders />
      </div>
    </Section>
  );
};

export default DashboardPage;

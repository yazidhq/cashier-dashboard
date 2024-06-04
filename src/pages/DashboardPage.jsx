import ProductsCard from "../components/product/ProductsCard";
import Orders from "../components/orders/Orders";
import Section from "../components/layouts/Section";

const DashboardPage = () => {
  return (
    <Section>
      <ProductsCard />
      <Orders />
    </Section>
  );
};

export default DashboardPage;

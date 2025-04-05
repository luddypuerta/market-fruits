
import ProductList from "@/pages/products/product-list/ProductList";
import { mockProducts } from "@/utils/mocks/products.mock";
import Header from "@/components/shared/header/Header";
import { useEffect } from "react";
import "./Home.scss";

const Home = () => {
  useEffect(() => {
    const existingData = localStorage.getItem("products");
    if (!existingData) {
      localStorage.setItem("products", JSON.stringify(mockProducts));
    }
  }, []);

  return (
    <div className="home-container">
      <Header />
      <main className="home_container__content">
        <h1 className="home-container__title">Explora lo que tenemos para ti 👇🏼</h1>
        <ProductList />
      </main>
    </div>
  );
};

export default Home;

import ProductList from "@/pages/products/product-list/ProductList";
import { mockProducts } from "@/utils/mocks/products.mock";
import Header from "@/components/shared/header/Header";
import { CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./Home.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = () => {
      const existingData = localStorage.getItem("products");
      if (!existingData) {
        localStorage.setItem("products", JSON.stringify(mockProducts));
      }
    };

    initializeData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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

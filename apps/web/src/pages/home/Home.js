import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "home-container", children: [_jsx(Header, {}), _jsxs("main", { className: "home_container__content", children: [_jsx("h1", { className: "home-container__title", children: "Explora lo que tenemos para ti \uD83D\uDC47\uD83C\uDFFC" }), _jsx(ProductList, {})] })] }));
};
export default Home;

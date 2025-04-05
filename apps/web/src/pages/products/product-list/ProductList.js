import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCard from "@/pages/products/product-card/ProductCard";
import { useProductStore } from "@/store/products/productStore";
import { useEffect } from "react";
import "./ProductList.scss";
const ProductList = () => {
    const { products, loadProducts } = useProductStore();
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});
    return (_jsx("section", { className: "product-section", children: Object.entries(groupedProducts).map(([category, items]) => (_jsxs("div", { children: [_jsx("h2", { className: "product-section__title", children: category }), _jsx("div", { className: "product-section__product-grid", children: items.map((product) => (_jsx(ProductCard, { ...product }, product.id))) })] }, category))) }));
};
export default ProductList;

import ProductCard from "@/pages/products/product-card/ProductCard";
import { useProductStore } from "@/store/products/productStore";
import { useEffect } from "react";
import "./ProductList.scss";

const ProductList: React.FC = () => {
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
  }, {} as Record<string, typeof products>);

  return (
    <section className="product-section">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category}>
          <h2 className="product-section__title">{category}</h2>
          <div className="product-section__product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductList;

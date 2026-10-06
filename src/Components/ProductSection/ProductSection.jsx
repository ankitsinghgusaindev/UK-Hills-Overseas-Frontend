import ProductCard from "../ProductCard/ProductCard";
import "./ProductSection.css";

function ProductSection({ title, products, setCartOpen }) {
  return (
    <section className="product-section" id="products">
      <h2 className="section-title">{title}</h2>

      {products.length === 0 ? (
        <div className="no-products">
          <h2>🔍 No Products Found</h2>
          <p>Try another keyword.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setCartOpen={setCartOpen}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductSection;
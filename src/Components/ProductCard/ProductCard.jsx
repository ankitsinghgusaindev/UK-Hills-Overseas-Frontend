import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";
import ProductModal from "../ProductModal/ProductModal";
import "./ProductCard.css";

function ProductCard({ product, setCartOpen }) {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedVariant =
    product.variants?.find(
      (variant) => variant.id === product.defaultVariantId
    ) ||
    product.variants?.[0] ||
    null;

  const getCartItem = () => {
    if (!selectedVariant) return null;

    return {
      ...product,
      productId: product.id,
      variantId: selectedVariant.id,
      selectedWeight: selectedVariant.weight,
      price: Number(selectedVariant.price),
    };
  };

  const handleAddToCart = () => {
    const cartItem = getCartItem();

    if (!cartItem) return;

    dispatch(addToCart(cartItem));
  };

  const handleBuyNow = () => {
    const cartItem = getCartItem();

    if (!cartItem) return;

    dispatch(addToCart(cartItem));
    setCartOpen?.(true);
  };

  return (
    <>
      <article className="product-card">
        <div className="product-card-image" >
          <button
            type="button"
            className="product-image-btn"
            onClick={() => setSelectedProduct(product)}
            aria-label={`View details for ${product.name}`}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>

          <span className="product-price">
            ₹
            {product.defaultPrice ||
              product.prices?.["500g"] ||
              "Price unavailable"}
          </span>

          <p>{product.description}</p>

          <div className="product-actions">
            <button
              type="button"
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            <button
              type="button"
              className="buy-now-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </article>

      <ProductModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        setCartOpen={setCartOpen}
      />
    </>
  );
}

export default ProductCard;
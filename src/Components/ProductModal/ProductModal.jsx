import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";
import "./ProductModal.css";

function ProductModal({ product, open, onClose, setCartOpen }) {
  const dispatch = useDispatch();

  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!product?.variants?.length) {
      setWeight("");
      return;
    }

    const defaultVariant =
      product.variants.find(
        (variant) => variant.id === product.defaultVariantId,
      ) ||
      product.variants.find(
        (variant) => variant.weight === product.defaultWeight,
      ) ||
      product.variants[0];

    setWeight(defaultVariant.weight);
  }, [product]);

  if (!open || !product) return null;

  const selectedVariant = product.variants?.find(
    (variant) => variant.weight === weight,
  );

  const currentPrice = selectedVariant ? Number(selectedVariant.price) : 0;

  const handleAddCart = () => {
    if (!selectedVariant) {
      alert("Please select a valid product variant.");
      return false;
    }

    dispatch(
      addToCart({
        ...product,
        productId: product.id,
        variantId: selectedVariant.id,
        selectedWeight: selectedVariant.weight,
        price: Number(selectedVariant.price),
      }),
    );

    return true;
  };

  const handleBuyNow = () => {
    const added = handleAddCart();

    if (!added) return;

    setCartOpen?.(true);
    onClose();
  };

  return (
    <div className="product-modal-overlay">
      <div className="product-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info">
            <span className="product-category">
              {typeof product.category === "object"
                ? product.category.name
                : product.category}
            </span>

            <h2>{product.name}</h2>

            <div className="rating-row">
              ⭐ {product.rating}
              <span>({product.reviews} Reviews)</span>
            </div>

            <div className="weight-selector">
              {product.variants?.map((variant) => (
                <button
                  key={variant.id}
                  className={weight === variant.weight ? "active" : ""}
                  onClick={() => setWeight(variant.weight)}
                >
                  {variant.weight}
                </button>
              ))}
            </div>

            <h3 className="dynamic-price">₹{currentPrice}</h3>

            <p>{product.description}</p>

            <div className="detail-box">
              <h4>Benefits</h4>
              <ul>
                {product.benefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="detail-box">
              <h4>Ingredients</h4>
              <p>{product.ingredients || "Not specified"}</p>
            </div>

            <div className="detail-box">
              <h4>Storage</h4>
              <p>{product.storage || "Not specified"}</p>
            </div>

            <div className="modal-actions">
              <button className="add-cart" onClick={handleAddCart}>
                Add To Cart
              </button>

              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;

export const adaptBackendProduct = (product) => {
  const variants = (product.variants || []).map((variant) => ({
    id: variant.id,
    weight: variant.weight,
    price: Number(variant.price),
    sku: variant.sku,
  }));

  const prices = variants.reduce((result, variant) => {
    result[variant.weight] = variant.price;
    return result;
  }, {});

  const defaultVariant =
    variants.find(
      (variant) => variant.id === product.defaultVariantId
    ) ||
    variants[0] ||
    null;

  const category =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const categoryId =
    typeof product.category === "object"
      ? product.category?.id
      : product.categoryId;

  return {
    ...product,

    productId: product.id,

    image: product.image || null,

    category: category || "Uncategorized",

    categoryId: categoryId || null,

    variants,

    prices,

    defaultWeight: defaultVariant?.weight || null,

    defaultVariantId: defaultVariant?.id || null,

    defaultPrice: defaultVariant?.price || 0,

    rating: Number(product.rating || 0),

    reviews: Number(product.reviews || 0),
  };
};
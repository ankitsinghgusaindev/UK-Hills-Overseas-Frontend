import React, { useEffect, useState } from "react";
import "./AdminProducts.css";
import {
  fetchAdminProducts,
  fetchAdminProductById,
  updateAdminProduct,
  fetchAdminCategories,
  createAdminProductVariant,
  updateAdminProductVariant,
  deleteAdminProductVariant,
  updateAdminVariantStock,
  deleteAdminProduct,
  createAdminProduct,
} from "../../../services/adminService";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showVariantForm, setShowVariantForm] = useState(null);
  const [editingVariantId, setEditingVariantId] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState("");

  const initialProductForm = {
    name: "",
    slug: "",
    sku: "",
    description: "",
    categoryId: "",
    image: "",

    benefits: [],
    ingredients: "",
    storage: "",
    nutrition: "",
    shelfLife: "",
    origin: "",
    tags: "",
  };

  const [newProduct, setNewProduct] = useState(initialProductForm);

  const [editVariantForm, setEditVariantForm] = useState({
    weight: "",
    price: "",
    sku: "",
    stock: "",
  });

  const [editVariantLoading, setEditVariantLoading] = useState(false);

  const [editVariantError, setEditVariantError] = useState("");

  const [variantForm, setVariantForm] = useState({
    weight: "",
    price: "",
    sku: "",
    stock: "",
  });

  const [variantLoading, setVariantLoading] = useState(false);
  const [variantError, setVariantError] = useState("");
  const [deletingVariantId, setDeletingVariantId] = useState(null);

  const [deleteVariantError, setDeleteVariantError] = useState("");

  const [editingStockId, setEditingStockId] = useState(null);

  const [stockForm, setStockForm] = useState("");

  const [stockLoading, setStockLoading] = useState(false);

  const [stockError, setStockError] = useState("");

  const [editingProductId, setEditingProductId] = useState(null);
  const [categories, setCategories] = useState([]);

  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    sku: "",
    description: "",
    categoryId: "",
    image: "",
  });

  const [productEditLoading, setProductEditLoading] = useState(false);
  const [productSaveLoading, setProductSaveLoading] = useState(false);
  const [productEditError, setProductEditError] = useState("");

  const handleArrayFieldChange = (event) => {
    const { name, value } = event.target;

    setNewProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;

    setNewProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddProductOpen = () => {
    setNewProduct(initialProductForm);
    setAddProductError("");
    setIsAddProductOpen(true);
  };

  const handleAddProductClose = () => {
    if (addProductLoading) return;

    setIsAddProductOpen(false);
    setAddProductError("");
  };

  const handleAddProductSubmit = async (event) => {
  event.preventDefault();

  if (addProductLoading) return;

  try {
    setAddProductLoading(true);
    setAddProductError("");

    let nutritionData;

    if (newProduct.nutrition.trim()) {
      try {
        nutritionData = JSON.parse(newProduct.nutrition);
      } catch {
        setAddProductError(
          "Nutrition information must be valid JSON."
        );
        setAddProductLoading(false);
        return;
      }
    }

    const payload = {
      name: newProduct.name.trim(),
      slug: newProduct.slug.trim(),
      sku: newProduct.sku.trim(),
      description: newProduct.description.trim() || undefined,
      categoryId: Number(newProduct.categoryId),
      image: newProduct.image.trim() || undefined,

      benefits: newProduct.benefits
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      ingredients:
        newProduct.ingredients.trim() || undefined,

      storage:
        newProduct.storage.trim() || undefined,

      nutrition: nutritionData,

      shelfLife:
        newProduct.shelfLife.trim() || undefined,

      origin:
        newProduct.origin.trim() || undefined,

      tags: newProduct.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const createdProduct =
      await createAdminProduct(payload);

    setProducts((previous) => [
      ...previous,
      createdProduct,
    ]);

    setIsAddProductOpen(false);
    setNewProduct(initialProductForm);
  } catch (error) {
    setAddProductError(
      error.message || "Failed to create product"
    );
  } finally {
    setAddProductLoading(false);
  }
};

  const handleDeleteClick = (product) => {
    setDeleteError("");
    setDeletingProduct(product);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct || deleteLoading) return;

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await deleteAdminProduct(deletingProduct.id);

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== deletingProduct.id),
      );

      setDeletingProduct(null);
    } catch (error) {
      setDeleteError(error.message || "Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    if (deleteLoading) return;

    setDeletingProduct(null);
    setDeleteError("");
  };

  const handleStartEditProduct = async (productId) => {
    try {
      setProductEditLoading(true);
      setProductEditError("");

      const [product, categoryData] = await Promise.all([
        fetchAdminProductById(productId),
        fetchAdminCategories(),
      ]);

      setCategories(categoryData);

      setProductForm({
        name: product.name || "",
        slug: product.slug || "",
        sku: product.sku || "",
        description: product.description || "",
        categoryId: String(product.categoryId ?? product.category?.id ?? ""),
        image: product.image || "",
      });

      setEditingProductId(productId);
    } catch (error) {
      setProductEditError(error.message || "Failed to load product");
    } finally {
      setProductEditLoading(false);
    }
  };

  const handleProductFormChange = (event) => {
    const { name, value } = event.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    try {
      setProductSaveLoading(true);
      setProductEditError("");

      const updatedProduct = await updateAdminProduct(editingProductId, {
        name: productForm.name.trim(),
        slug: productForm.slug.trim(),
        sku: productForm.sku.trim(),
        description: productForm.description.trim(),
        categoryId: Number(productForm.categoryId),
        image: productForm.image.trim(),
      });

      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingProductId
            ? { ...product, ...updatedProduct }
            : product,
        ),
      );

      setEditingProductId(null);
    } catch (error) {
      setProductEditError(error.message || "Failed to update product");
    } finally {
      setProductSaveLoading(false);
    }
  };

  const handleCancelProductEdit = () => {
    setEditingProductId(null);
    setProductEditError("");
  };

  const handleEditStock = (variant) => {
    setEditingStockId(variant.id);
    setStockForm(variant.stock ?? "");
    setStockError("");
  };

  const handleStockChange = (event) => {
    setStockForm(event.target.value);
  };

  const handleUpdateStock = async (event, productId) => {
    event.preventDefault();

    try {
      setStockLoading(true);
      setStockError("");

      const updatedVariant = await updateAdminVariantStock(
        editingStockId,
        Number(stockForm),
      );

      setProducts((previousProducts) =>
        previousProducts.map((product) => {
          if (product.id !== productId) {
            return product;
          }

          return {
            ...product,
            variants: product.variants.map((variant) =>
              variant.id === editingStockId
                ? {
                    ...variant,
                    ...updatedVariant,
                  }
                : variant,
            ),
          };
        }),
      );

      setEditingStockId(null);
      setStockForm("");
    } catch (error) {
      setStockError(error.message || "Failed to update stock");
    } finally {
      setStockLoading(false);
    }
  };

  const handleDeleteVariant = async (variantId, productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this variant?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingVariantId(variantId);
      setDeleteVariantError("");

      await deleteAdminProductVariant(variantId);

      setProducts((previousProducts) =>
        previousProducts.map((product) => {
          if (product.id !== productId) {
            return product;
          }

          return {
            ...product,
            variants: product.variants.filter(
              (variant) => variant.id !== variantId,
            ),
          };
        }),
      );

      // If the deleted variant was being edited,
      // close the edit mode.
      if (editingVariantId === variantId) {
        setEditingVariantId(null);
      }
    } catch (error) {
      setDeleteVariantError(error.message || "Failed to delete variant");
    } finally {
      setDeletingVariantId(null);
    }
  };

  const handleVariantChange = (event) => {
    const { name, value } = event.target;

    setVariantForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddVariant = async (event, productId) => {
    event.preventDefault();

    try {
      setVariantLoading(true);
      setVariantError("");

      const createdVariant = await createAdminProductVariant(productId, {
        weight: variantForm.weight,
        price: Number(variantForm.price),
        sku: variantForm.sku,
        stock: Number(variantForm.stock),
      });

      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === productId
            ? {
                ...product,
                variants: [...(product.variants || []), createdVariant],
              }
            : product,
        ),
      );

      setVariantForm({
        weight: "",
        price: "",
        sku: "",
        stock: "",
      });

      setShowVariantForm(null);
    } catch (error) {
      setVariantError(error.message || "Failed to create variant");
    } finally {
      setVariantLoading(false);
    }
  };

  const handleEditVariant = (variant) => {
    setEditingVariantId(variant.id);

    setEditVariantError("");

    setEditVariantForm({
      weight: variant.weight || "",
      price: variant.price ?? "",
      sku: variant.sku || "",
      stock: variant.stock ?? "",
    });
  };

  const handleEditVariantChange = (event) => {
    const { name, value } = event.target;

    setEditVariantForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateVariant = async (event, productId) => {
    event.preventDefault();

    try {
      setEditVariantLoading(true);
      setEditVariantError("");

      const updatedVariant = await updateAdminProductVariant(editingVariantId, {
        weight: editVariantForm.weight,
        price: Number(editVariantForm.price),
        sku: editVariantForm.sku,
        stock: Number(editVariantForm.stock),
      });

      setProducts((previousProducts) =>
        previousProducts.map((product) => {
          if (product.id !== productId) {
            return product;
          }

          return {
            ...product,
            variants: product.variants.map((variant) =>
              variant.id === editingVariantId ? updatedVariant : variant,
            ),
          };
        }),
      );

      setEditingVariantId(null);

      setEditVariantForm({
        weight: "",
        price: "",
        sku: "",
        stock: "",
      });
    } catch (error) {
      setEditVariantError(error.message || "Failed to update variant");
    } finally {
      setEditVariantLoading(false);
    }
  };

  useEffect(() => {
    const modalOpen =
      editingProductId !== null || deletingProduct !== null || isAddProductOpen;

    const isSaving = productSaveLoading || deleteLoading;

    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSaving) {
        if (isAddProductOpen) {
          handleAddProductClose();
        } else if (deletingProduct !== null) {
          handleDeleteCancel();
        } else if (editingProductId !== null) {
          handleEditCancel();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editingProductId, deletingProduct, productSaveLoading, deleteLoading]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAdminProducts();

        setProducts(data);
      } catch (error) {
        setError(error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="admin-products-state">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="admin-products-state admin-products-error">{error}</div>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <div>
          <h2>Products</h2>
          <p>Manage your UK Hills Overseas products</p>
        </div>

        <button
          type="button"
          className="admin-add-product-btn"
          onClick={handleAddProductOpen}
        >
          + Add Product
        </button>
      </div>

      <div className="admin-products-card">
        <div className="admin-products-summary">
          <span>
            Total Products: <strong>{products.length}</strong>
          </span>
        </div>
        {products.length === 0 ? (
          <div className="admin-products-empty">No products found.</div>
        ) : (
          <div className="admin-products-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Variants</th>
                  <th>Starting Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <React.Fragment key={product.id}>
                    {/* Product Row */}
                    <tr>
                      <td>
                        <div className="admin-product-info">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="admin-product-image"
                            />
                          ) : (
                            <div className="admin-product-image-placeholder">
                              No Image
                            </div>
                          )}

                          <div>
                            <strong>{product.name}</strong>
                            <span>ID: #{product.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>{product.sku}</td>

                      <td>{product.category?.name || "—"}</td>

                      <td>
                        {editVariantError && (
                          <div className="admin-variant-form-error">
                            {editVariantError}
                          </div>
                        )}
                        {deleteVariantError && (
                          <div className="admin-variant-form-error">
                            {deleteVariantError}
                          </div>
                        )}
                        {stockError && (
                          <div className="admin-variant-form-error">
                            {stockError}
                          </div>
                        )}
                        <div className="admin-variants-list">
                          {product.variants?.length > 0 ? (
                            product.variants.map((variant) => (
                              <div
                                key={variant.id}
                                className="admin-variant-row"
                              >
                                {editingVariantId === variant.id ? (
                                  <form
                                    className="admin-variant-edit-form"
                                    onSubmit={(event) =>
                                      handleUpdateVariant(event, product.id)
                                    }
                                  >
                                    <input
                                      name="weight"
                                      type="text"
                                      value={editVariantForm.weight}
                                      onChange={handleEditVariantChange}
                                      placeholder="Weight"
                                      required
                                    />

                                    <input
                                      name="price"
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={editVariantForm.price}
                                      onChange={handleEditVariantChange}
                                      placeholder="Price"
                                      required
                                    />

                                    <input
                                      name="sku"
                                      type="text"
                                      value={editVariantForm.sku}
                                      onChange={handleEditVariantChange}
                                      placeholder="SKU"
                                      required
                                    />

                                    <input
                                      name="stock"
                                      type="number"
                                      min="0"
                                      step="1"
                                      value={editVariantForm.stock}
                                      onChange={handleEditVariantChange}
                                      placeholder="Stock"
                                      required
                                    />

                                    <button
                                      type="submit"
                                      className="admin-variant-save-small"
                                      disabled={editVariantLoading}
                                    >
                                      {editVariantLoading
                                        ? "Saving..."
                                        : "Save"}
                                    </button>

                                    <button
                                      type="button"
                                      className="admin-variant-cancel-small"
                                      onClick={() => {
                                        setEditingVariantId(null);
                                        setEditVariantError("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </form>
                                ) : (
                                  <>
                                    <span className="admin-variant-weight">
                                      {variant.weight}
                                    </span>

                                    <span className="admin-variant-price">
                                      ₹{Number(variant.price).toFixed(2)}
                                    </span>

                                    <span className="admin-variant-sku">
                                      {variant.sku}
                                    </span>

                                    {editingStockId === variant.id ? (
                                      <form
                                        className="admin-stock-edit-form"
                                        onSubmit={(event) =>
                                          handleUpdateStock(event, product.id)
                                        }
                                      >
                                        <input
                                          type="number"
                                          min="0"
                                          step="1"
                                          value={stockForm}
                                          onChange={handleStockChange}
                                          required
                                          autoFocus
                                        />

                                        <button
                                          type="submit"
                                          className="admin-stock-save-btn"
                                          disabled={stockLoading}
                                        >
                                          {stockLoading ? "Saving..." : "Save"}
                                        </button>

                                        <button
                                          type="button"
                                          className="admin-stock-cancel-btn"
                                          onClick={() => {
                                            setEditingStockId(null);
                                            setStockForm("");
                                            setStockError("");
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </form>
                                    ) : (
                                      <>
                                        <span className="admin-variant-stock">
                                          Stock: {variant.stock}
                                        </span>

                                        <button
                                          type="button"
                                          className="admin-stock-edit-btn"
                                          onClick={() =>
                                            handleEditStock(variant)
                                          }
                                        >
                                          Stock
                                        </button>
                                      </>
                                    )}

                                    <button
                                      type="button"
                                      className="admin-variant-edit-btn"
                                      onClick={() => handleEditVariant(variant)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="admin-variant-delete-btn"
                                      onClick={() =>
                                        handleDeleteVariant(
                                          variant.id,
                                          product.id,
                                        )
                                      }
                                      disabled={
                                        deletingVariantId === variant.id
                                      }
                                    >
                                      {deletingVariantId === variant.id
                                        ? "Deleting..."
                                        : "Delete"}
                                    </button>
                                  </>
                                )}
                              </div>
                            ))
                          ) : (
                            <span className="admin-no-variants">
                              No variants
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        {product.minPrice != null
                          ? `₹${Number(product.minPrice).toFixed(2)}`
                          : "—"}
                      </td>

                      <td>
                        <div className="admin-product-actions">
                          <button
                            type="button"
                            className="admin-product-action-btn"
                            onClick={() => handleStartEditProduct(product.id)}
                            disabled={productEditLoading}
                          >
                            {productEditLoading ? "Loading..." : "Edit"}
                          </button>

                          <button
                            type="button"
                            className="admin-product-action-btn danger"
                            onClick={() => handleDeleteClick(product)}
                          >
                            Delete
                          </button>

                          <button
                            type="button"
                            className="admin-product-action-btn"
                            onClick={() => {
                              setShowVariantForm(
                                showVariantForm === product.id
                                  ? null
                                  : product.id,
                              );

                              setVariantError("");

                              setVariantForm({
                                weight: "",
                                price: "",
                                sku: "",
                                stock: "",
                              });
                            }}
                          >
                            + Variant
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Add Variant Form Row */}
                    {showVariantForm === product.id && (
                      <tr>
                        <td colSpan="6">
                          <form
                            className="admin-variant-form"
                            onSubmit={(event) =>
                              handleAddVariant(event, product.id)
                            }
                          >
                            {/* Form Header */}
                            <div className="admin-variant-form-header">
                              <div>
                                <strong>Add Variant — {product.name}</strong>

                                <span>Product ID: #{product.id}</span>
                              </div>

                              <button
                                type="button"
                                className="admin-variant-close-btn"
                                onClick={() => {
                                  setShowVariantForm(null);
                                  setVariantError("");
                                }}
                              >
                                ×
                              </button>
                            </div>

                            {/* Error */}
                            {variantError && (
                              <div className="admin-variant-form-error">
                                {variantError}
                              </div>
                            )}

                            {/* Form Fields */}
                            <div className="admin-variant-form-grid">
                              {/* Weight */}
                              <div className="admin-form-field">
                                <label htmlFor={`weight-${product.id}`}>
                                  Weight
                                </label>

                                <input
                                  id={`weight-${product.id}`}
                                  name="weight"
                                  type="text"
                                  placeholder="e.g. 500g"
                                  value={variantForm.weight}
                                  onChange={handleVariantChange}
                                  required
                                />
                              </div>

                              {/* Price */}
                              <div className="admin-form-field">
                                <label htmlFor={`price-${product.id}`}>
                                  Price
                                </label>

                                <input
                                  id={`price-${product.id}`}
                                  name="price"
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="e.g. 299"
                                  value={variantForm.price}
                                  onChange={handleVariantChange}
                                  required
                                />
                              </div>

                              {/* SKU */}
                              <div className="admin-form-field">
                                <label htmlFor={`sku-${product.id}`}>SKU</label>

                                <input
                                  id={`sku-${product.id}`}
                                  name="sku"
                                  type="text"
                                  placeholder="e.g. MANGO-500"
                                  value={variantForm.sku}
                                  onChange={handleVariantChange}
                                  required
                                />
                              </div>

                              {/* Stock */}
                              <div className="admin-form-field">
                                <label htmlFor={`stock-${product.id}`}>
                                  Stock
                                </label>

                                <input
                                  id={`stock-${product.id}`}
                                  name="stock"
                                  type="number"
                                  min="0"
                                  step="1"
                                  placeholder="e.g. 20"
                                  value={variantForm.stock}
                                  onChange={handleVariantChange}
                                  required
                                />
                              </div>
                            </div>

                            {/* Form Actions */}
                            <div className="admin-variant-form-actions">
                              <button
                                type="button"
                                className="admin-variant-cancel-btn"
                                onClick={() => {
                                  setShowVariantForm(null);
                                  setVariantError("");
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                type="submit"
                                className="admin-variant-save-btn"
                                disabled={variantLoading}
                              >
                                {variantLoading ? "Adding..." : "Add Variant"}
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {editingProductId !== null && (
        <div className="admin-modal-overlay">
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-title"
          >
            <div className="admin-modal-header">
              <div>
                <h2 id="edit-product-title">Edit Product</h2>
                <p>Update your product information</p>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={handleCancelProductEdit}
                disabled={productSaveLoading}
                aria-label="Close edit product form"
              >
                ×
              </button>
            </div>

            {productEditError && (
              <div className="admin-variant-form-error">{productEditError}</div>
            )}

            <form onSubmit={handleUpdateProduct}>
              <div className="admin-product-edit-grid">
                <div className="admin-form-field">
                  <label htmlFor="edit-product-name">Product Name</label>
                  <input
                    id="edit-product-name"
                    name="name"
                    value={productForm.name}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="edit-product-slug">Slug</label>
                  <input
                    id="edit-product-slug"
                    name="slug"
                    value={productForm.slug}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="edit-product-sku">SKU</label>
                  <input
                    id="edit-product-sku"
                    name="sku"
                    value={productForm.sku}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="edit-product-category">Category</label>
                  <select
                    id="edit-product-category"
                    name="categoryId"
                    value={productForm.categoryId}
                    onChange={handleProductFormChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-field">
                  <label htmlFor="edit-product-image">Image URL</label>
                  <input
                    id="edit-product-image"
                    name="image"
                    type="url"
                    value={productForm.image}
                    onChange={handleProductFormChange}
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="edit-product-description">Description</label>
                  <textarea
                    id="edit-product-description"
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    rows="3"
                  />
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-variant-cancel-btn"
                  onClick={handleCancelProductEdit}
                  disabled={productSaveLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-variant-save-btn"
                  disabled={productSaveLoading}
                >
                  {productSaveLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deletingProduct && (
        <div
          className="admin-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleteLoading) {
              handleDeleteCancel();
            }
          }}
        >
          <div
            className="admin-modal admin-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
          >
            <div className="admin-modal-header">
              <h2 id="delete-product-title">Delete Product</h2>

              <button
                type="button"
                className="admin-modal-close"
                onClick={handleDeleteCancel}
                disabled={deleteLoading}
                aria-label="Close delete confirmation"
              >
                &times;
              </button>
            </div>

            <div className="admin-delete-content">
              <p>
                Are you sure you want to delete{" "}
                <strong>{deletingProduct.name}</strong>?
              </p>

              <p className="admin-delete-warning">
                This action cannot be undone.
              </p>

              {deleteError && (
                <p className="admin-form-error" role="alert">
                  {deleteError}
                </p>
              )}
            </div>

            <div className="admin-modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={handleDeleteCancel}
                disabled={deleteLoading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddProductOpen && (
        <div
          className="admin-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !addProductLoading) {
              handleAddProductClose();
            }
          }}
        >
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
          >
            <div className="admin-modal-header">
              <h2 id="add-product-title">Add New Product</h2>

              <button
                type="button"
                className="admin-modal-close"
                onClick={handleAddProductClose}
                disabled={addProductLoading}
                aria-label="Close add product form"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit}>
              <div className="admin-product-edit-grid">
                <div className="form-group">
                  <label htmlFor="new-product-name">Product Name *</label>
                  <input
                    id="new-product-name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    required
                    minLength={2}
                    placeholder="e.g. Himalayan Amla Pickle"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-product-slug">Slug *</label>
                  <input
                    id="new-product-slug"
                    name="slug"
                    value={newProduct.slug}
                    onChange={handleNewProductChange}
                    required
                    minLength={2}
                    placeholder="e.g. himalayan-amla-pickle"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-product-sku">SKU *</label>
                  <input
                    id="new-product-sku"
                    name="sku"
                    value={newProduct.sku}
                    onChange={handleNewProductChange}
                    required
                    minLength={2}
                    placeholder="e.g. UKH-AMLA-001"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-product-category">Category *</label>
                  <select
                    id="new-product-category"
                    name="categoryId"
                    value={newProduct.categoryId}
                    onChange={handleNewProductChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="new-product-image">Image URL</label>
                  <input
                    id="new-product-image"
                    name="image"
                    type="url"
                    value={newProduct.image}
                    onChange={handleNewProductChange}
                    placeholder="https://example.com/product.jpg"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="new-product-description">Description</label>
                  <textarea
                    id="new-product-description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                    rows={4}
                    placeholder="Enter product description"
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="new-product-benefits">Benefits</label>

                  <input
                    id="new-product-benefits"
                    name="benefits"
                    value={newProduct.benefits}
                    onChange={handleNewProductChange}
                    placeholder="Healthy, Natural, Rich in nutrients"
                  />

                  <small>Separate multiple benefits with commas.</small>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="new-product-ingredients">Ingredients</label>

                  <textarea
                    id="new-product-ingredients"
                    name="ingredients"
                    value={newProduct.ingredients}
                    onChange={handleNewProductChange}
                    rows={3}
                    placeholder="Mango, mustard oil, spices, salt..."
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="new-product-storage">
                    Storage Instructions
                  </label>

                  <textarea
                    id="new-product-storage"
                    name="storage"
                    value={newProduct.storage}
                    onChange={handleNewProductChange}
                    rows={3}
                    placeholder="Store in a cool and dry place..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="new-product-shelfLife">Shelf Life</label>

                  <input
                    id="new-product-shelfLife"
                    name="shelfLife"
                    value={newProduct.shelfLife}
                    onChange={handleNewProductChange}
                    placeholder="6 months"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-product-origin">Origin</label>

                  <input
                    id="new-product-origin"
                    name="origin"
                    value={newProduct.origin}
                    onChange={handleNewProductChange}
                    placeholder="Uttarakhand, India"
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="new-product-tags">Tags</label>

                  <input
                    id="new-product-tags"
                    name="tags"
                    value={newProduct.tags}
                    onChange={handleNewProductChange}
                    placeholder="pickle, organic, uttarakhand, traditional"
                  />

                  <small>Separate multiple tags with commas.</small>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="new-product-nutrition">
                    Nutrition Information
                  </label>

                  <textarea
                    id="new-product-nutrition"
                    name="nutrition"
                    value={newProduct.nutrition}
                    onChange={handleNewProductChange}
                    rows={6}
                    placeholder={`{
  "calories": "250 kcal",
  "protein": "5g",
  "carbohydrates": "30g",
  "fat": "10g"
}`}
                  />

                  <small>Enter valid JSON.</small>
                </div>
              </div>

              {addProductError && (
                <p className="admin-form-error" role="alert">
                  {addProductError}
                </p>
              )}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleAddProductClose}
                  disabled={addProductLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={addProductLoading}
                >
                  {addProductLoading ? "Creating..." : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;

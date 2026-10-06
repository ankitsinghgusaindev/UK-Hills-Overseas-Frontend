import { useEffect, useState } from "react";
import {
  fetchAdminProducts,
  updateAdminVariantStock,
} from "../../../services/adminService";

import "./AdminInventory.css";

function AdminInventory() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingVariantId, setUpdatingVariantId] = useState(null);

  const [editingVariantId, setEditingVariantId] = useState(null);

  const [stockValue, setStockValue] = useState("");

  const [stockError, setStockError] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAdminProducts();

      setProducts(data || []);
    } catch (error) {
      setError(
        error.message || "Failed to load inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditStock = (variant) => {
    setEditingVariantId(variant.id);
    setStockValue(variant.stock ?? "");
    setStockError("");
  };

  const handleCancelStock = () => {
    setEditingVariantId(null);
    setStockValue("");
    setStockError("");
  };

  const handleSaveStock = async (variantId, productId) => {
    try {
      setUpdatingVariantId(variantId);
      setStockError("");

      const stock = Number(stockValue);

      if (!Number.isInteger(stock) || stock < 0) {
        setStockError(
          "Stock must be a whole number greater than or equal to 0."
        );
        return;
      }

      const updatedVariant =
        await updateAdminVariantStock(
          variantId,
          stock
        );

      setProducts((previousProducts) =>
        previousProducts.map((product) => {
          if (product.id !== productId) {
            return product;
          }

          return {
            ...product,

            variants: product.variants.map(
              (variant) =>
                variant.id === variantId
                  ? {
                      ...variant,
                      ...updatedVariant,
                      stock,
                    }
                  : variant
            ),
          };
        })
      );

      handleCancelStock();
    } catch (error) {
      setStockError(
        error.message || "Failed to update stock"
      );
    } finally {
      setUpdatingVariantId(null);
    }
  };

  /*
   * Convert:
   *
   * products
   *   ↓
   * variants
   *
   * into one flat inventory list.
   */
  const inventoryItems = products.flatMap(
    (product) =>
      (product.variants || []).map(
        (variant) => ({
          ...variant,
          productId: product.id,
          productName: product.name,
        })
      )
  );

  const totalVariants = inventoryItems.length;

  const inStockCount = inventoryItems.filter(
    (item) => item.stock > 10
  ).length;

  const lowStockCount = inventoryItems.filter(
    (item) =>
      item.stock > 0 && item.stock <= 10
  ).length;

  const outOfStockCount = inventoryItems.filter(
    (item) => item.stock === 0
  ).length;

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return "Out of Stock";
    }

    if (stock <= 10) {
      return "Low Stock";
    }

    return "In Stock";
  };

  if (loading) {
    return (
      <div className="admin-inventory-state">
        Loading inventory...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-inventory-state error">
        <p>{error}</p>

        <button
          type="button"
          onClick={loadInventory}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-inventory">

      {/* Header */}

      <div className="admin-inventory-header">

        <div>
          <h2>Inventory</h2>

          <p>
            Manage stock levels across your products.
          </p>
        </div>

        <button
          type="button"
          className="admin-inventory-refresh-btn"
          onClick={loadInventory}
        >
          ↻ Refresh
        </button>

      </div>

      {/* Summary */}

      <div className="admin-inventory-summary">

        <div className="admin-inventory-summary-card">
          <span>Total Variants</span>
          <strong>{totalVariants}</strong>
        </div>

        <div className="admin-inventory-summary-card">
          <span>In Stock</span>
          <strong>{inStockCount}</strong>
        </div>

        <div className="admin-inventory-summary-card">
          <span>Low Stock</span>
          <strong>{lowStockCount}</strong>
        </div>

        <div className="admin-inventory-summary-card">
          <span>Out of Stock</span>
          <strong>{outOfStockCount}</strong>
        </div>

      </div>

      {/* Inventory table */}

      <div className="admin-inventory-card">

        {inventoryItems.length === 0 ? (
          <div className="admin-inventory-empty">
            <h3>No inventory found</h3>

            <p>
              Add product variants to manage inventory.
            </p>
          </div>
        ) : (
          <div className="admin-inventory-table-wrapper">

            <table className="admin-inventory-table">

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {inventoryItems.map((item) => {

                  const status =
                    getStockStatus(item.stock);

                  return (
                    <tr key={item.id}>

                      <td>
                        <strong>
                          {item.productName}
                        </strong>
                      </td>

                      <td>
                        {item.weight}
                      </td>

                      <td>
                        <span className="admin-inventory-sku">
                          {item.sku}
                        </span>
                      </td>

                      <td>
                        ₹
                        {Number(item.price).toFixed(2)}
                      </td>

                      <td>

                        {editingVariantId ===
                        item.id ? (
                          <div className="admin-inventory-stock-edit">

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={stockValue}
                              onChange={(event) =>
                                setStockValue(
                                  event.target.value
                                )
                              }
                              autoFocus
                            />

                          </div>
                        ) : (
                          <strong>
                            {item.stock}
                          </strong>
                        )}

                      </td>

                      <td>

                        <span
                          className={`admin-inventory-status ${status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {status}
                        </span>

                      </td>

                      <td>

                        {editingVariantId ===
                        item.id ? (
                          <div className="admin-inventory-actions">

                            <button
                              type="button"
                              className="admin-inventory-save-btn"
                              disabled={
                                updatingVariantId ===
                                item.id
                              }
                              onClick={() =>
                                handleSaveStock(
                                  item.id,
                                  item.productId
                                )
                              }
                            >
                              {updatingVariantId ===
                              item.id
                                ? "Saving..."
                                : "Save"}
                            </button>

                            <button
                              type="button"
                              className="admin-inventory-cancel-btn"
                              onClick={
                                handleCancelStock
                              }
                            >
                              Cancel
                            </button>

                          </div>
                        ) : (
                          <button
                            type="button"
                            className="admin-inventory-edit-btn"
                            onClick={() =>
                              handleEditStock(item)
                            }
                          >
                            Update Stock
                          </button>
                        )}

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {stockError && (
        <div className="admin-inventory-error">
          {stockError}
        </div>
      )}

    </div>
  );
}

export default AdminInventory;
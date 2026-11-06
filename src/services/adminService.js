
import { apiRequest, ApiError } from "./apiClient";

// Shared helper for admin API requests.
async function adminRequest(path, options, fallbackMessage) {
  try {
    const result = await apiRequest(path, options);
    return result.data;
  } catch (error) {
    // Preserve the existing operation-specific fallback messages.
    if (
      error instanceof ApiError &&
      error.message.startsWith("Request failed with status")
    ) {
      throw new ApiError(fallbackMessage, {
        status: error.status,
        requestId: error.requestId,
      });
    }

    throw error;
  }
}

// ORDERS

export function fetchAdminOrders() {
  return adminRequest(
    "/admin/orders",
    { method: "GET" },
    "Failed to fetch orders"
  );
}

export function fetchAdminOrderById(orderId) {
  return adminRequest(
    `/admin/orders/${orderId}`,
    { method: "GET" },
    "Failed to fetch order"
  );
}

export function updateAdminOrderStatus(orderId, status) {
  return adminRequest(
    `/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      body: { status },
    },
    "Failed to update order status"
  );
}

// PRODUCTS

export function fetchAdminProducts() {
  return adminRequest(
    "/admin/products",
    { method: "GET" },
    "Failed to fetch products"
  );
}

export function fetchAdminProductById(productId) {
  return adminRequest(
    `/admin/products/${productId}`,
    { method: "GET" },
    "Failed to fetch product"
  );
}

export function createAdminProduct(productData) {
  return adminRequest(
    "/admin/products",
    {
      method: "POST",
      body: productData,
    },
    "Failed to create product"
  );
}

export function updateAdminProduct(productId, productData) {
  return adminRequest(
    `/admin/products/${productId}`,
    {
      method: "PATCH",
      body: productData,
    },
    "Failed to update product"
  );
}

export function deleteAdminProduct(productId) {
  return adminRequest(
    `/admin/products/${productId}`,
    { method: "DELETE" },
    "Failed to delete product"
  );
}

// PRODUCT VARIANTS

export function createAdminProductVariant(productId, variantData) {
  return adminRequest(
    `/admin/products/${productId}/variants`,
    {
      method: "POST",
      body: variantData,
    },
    "Failed to create variant"
  );
}

export function updateAdminProductVariant(variantId, variantData) {
  return adminRequest(
    `/admin/variants/${variantId}`,
    {
      method: "PATCH",
      body: variantData,
    },
    "Failed to update variant"
  );
}

export function deleteAdminProductVariant(variantId) {
  return adminRequest(
    `/admin/variants/${variantId}`,
    { method: "DELETE" },
    "Failed to delete variant"
  );
}

// INVENTORY

export function updateAdminVariantStock(variantId, stock) {
  return adminRequest(
    `/admin/variants/${variantId}/inventory`,
    {
      method: "PATCH",
      body: { stock: Number(stock) },
    },
    "Failed to update stock"
  );
}

// CATEGORIES

export function fetchAdminCategories() {
  return adminRequest(
    "/admin/categories",
    { method: "GET" },
    "Failed to fetch categories"
  );
}

export function createAdminCategory(categoryData) {
  return adminRequest(
    "/admin/categories",
    {
      method: "POST",
      body: categoryData,
    },
    "Failed to create category"
  );
}

export function deleteAdminCategory(categoryId) {
  return adminRequest(
    `/admin/categories/${categoryId}`,
    { method: "DELETE" },
    "Failed to delete category"
  );
}

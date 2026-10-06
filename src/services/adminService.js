const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export async function fetchAdminOrders() {
  const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch orders");
  }

  return result.data;
}

export async function fetchAdminOrderById(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/orders/${orderId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch order");
  }

  return result.data;
}

export async function updateAdminOrderStatus(orderId, status) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update order status");
  }

  return result.data;
}

export async function fetchAdminProducts() {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch products"
    );
  }

  return result.data;
}

export async function createAdminProductVariant(productId, variantData) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products/${productId}/variants`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variantData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create variant"
    );
  }

  return result.data;
}

export async function updateAdminProductVariant(
  variantId,
  variantData,
) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/variants/${variantId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variantData),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update variant",
    );
  }

  return result.data;
}

export async function deleteAdminProductVariant(variantId) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/variants/${variantId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete variant",
    );
  }

  return result.data;
}

export async function updateAdminVariantStock(variantId, stock) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/variants/${variantId}/inventory`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: Number(stock),
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update stock");
  }

  return result.data;
}

export async function fetchAdminCategories() {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/categories`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch categories"
    );
  }

  return result.data;
}

export async function createAdminCategory(categoryData) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/categories`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create category"
    );
  }

  return result.data;
}

export async function deleteAdminCategory(categoryId) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/categories/${categoryId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete category"
    );
  }

  return result.data;
}

export async function fetchAdminProductById(productId) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products/${productId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch product");
  }

  return result.data;
}

export async function updateAdminProduct(productId, productData) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products/${productId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update product");
  }

  return result.data;
}
export async function deleteAdminProduct(productId) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete product");
  }

  return result.data;
}


export async function createAdminProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create product");
  }

  return result.data;
}

const API_URL = import.meta.env.VITE_API_URL;

// CREATE ORDER
export const createOrder = async ({
  customer,
  cartItems,
  coupon = "",
  orderSource = "WEBSITE",
  paymentMethod = "COD",
}) => {
  const items = cartItems.map((item) => ({
    productId: Number(item.productId),
    variantId: Number(item.variantId),
    quantity: Number(item.quantity),
  }));

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        state: customer.state.trim(),
        postalCode: customer.postalCode.trim(),
      },

      items,

      // Send only the coupon code.
      // Backend calculates the actual discount.
      coupon: coupon.trim().toUpperCase(),

      orderSource,
      paymentMethod,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create order.");
  }

  return result.data;
};

// SAVE RAZORPAY ORDER ID
export const saveRazorpayOrderId = async (
  orderId,
  razorpayOrderId,
) => {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/razorpay`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpayOrderId,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Unable to save Razorpay order ID.",
    );
  }

  return result.data;
};

// VERIFY RAZORPAY PAYMENT
export const verifyRazorpayPayment = async ({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const response = await fetch(
    `${API_URL}/orders/verify-payment`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Payment verification failed.",
    );
  }

  return result.data;
};

// CREATE RAZORPAY ORDER
export const createRazorpayOrder = async ({ orderId }) => {
  const response = await fetch(
    `${API_URL}/payment/create-order`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create Razorpay order.",
    );
  }

  return result.data;
};

// FETCH USER ORDERS
export const fetchOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch orders.");
  }

  return result.data;
};
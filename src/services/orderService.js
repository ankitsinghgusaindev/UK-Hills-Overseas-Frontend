
import { apiRequest } from "./apiClient";

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

  const result = await apiRequest("/orders", {
    method: "POST",
    body: {
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

      // Backend calculates the actual discount.
      coupon: coupon.trim().toUpperCase(),

      orderSource,
      paymentMethod,
    },
  });

  return result.data;
};

// SAVE RAZORPAY ORDER ID
export const saveRazorpayOrderId = async (
  orderId,
  razorpayOrderId
) => {
  const result = await apiRequest(
    `/orders/${orderId}/razorpay`,
    {
      method: "PATCH",
      body: { razorpayOrderId },
    }
  );

  return result.data;
};

// VERIFY RAZORPAY PAYMENT
export const verifyRazorpayPayment = async ({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const result = await apiRequest("/orders/verify-payment", {
    method: "POST",
    body: {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    },
  });

  return result.data;
};

// CREATE RAZORPAY ORDER
export const createRazorpayOrder = async ({ orderId }) => {
  const result = await apiRequest("/payment/create-order", {
    method: "POST",
    body: { orderId },
  });

  return result.data;
};

// FETCH USER ORDERS
export const fetchOrders = async () => {
  const result = await apiRequest("/orders", {
    method: "GET",
  });

  return result.data;
};


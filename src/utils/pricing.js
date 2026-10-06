const COUPON_RATES = {
  WELCOME10: 0.10,
  UKHILLS20: 0.20,
};

export const getCouponRate = (coupon = "") =>
  COUPON_RATES[String(coupon).trim().toUpperCase()] || 0;

export const calculateCartTotals = (cartItems = [], coupon = "") => {
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const normalizedCoupon = String(coupon).trim().toUpperCase();

  const couponRate = getCouponRate(normalizedCoupon);

  const discount = subtotal * couponRate;

  const discountedSubtotal = subtotal - discount;

  const shipping = subtotal > 1000 ? 0 : 80;

  const gst = discountedSubtotal * 0.18;

  const total = discountedSubtotal + gst + shipping;

  return {
    subtotal,
    discount,
    discountedSubtotal,
    shipping,
    gst,
    total,
    coupon: normalizedCoupon,
    couponRate,
  };
};
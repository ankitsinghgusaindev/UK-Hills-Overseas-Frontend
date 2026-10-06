import "./WhatsappButton.css";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ hidden }) => {
  if (hidden) {
    return null;
  }

  const message = `
🏔️ Welcome to UK Hills Overseas

Thank you for your interest in our authentic Himalayan products.

Please provide:

👤 Name:
📞 Contact Number:
📧 Email:

🛒 Product Name:
📦 Quantity Required:

📍 Delivery Address:

Any Additional Requirement:

Our team will get back to you shortly with pricing and delivery details.

Regards,
UK Hills Overseas
`;

  const whatsappUrl = `https://wa.me/917983524302?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contact UK Hills on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
};

export default WhatsAppButton;
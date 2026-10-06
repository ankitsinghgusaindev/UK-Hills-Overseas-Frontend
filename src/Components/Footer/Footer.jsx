import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();

  const orders = useSelector((state) => state.orders.orders);

  const activeOrders = orders.filter(
    (order) => order.status !== "Delivered"
  );

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-top-banner">
        <div>
          <FaTruck aria-hidden="true" />
          <span>Pan India Delivery</span>
        </div>

        <div>
          <FaShieldAlt aria-hidden="true" />
          <span>100% Authentic Himalayan Products</span>
        </div>
      </div>

      <div className="footer-container">
        {/* Company */}
        <div className="footer-column">
          <h2>UK Hills Overseas</h2>

          <p>
            Bringing authentic Himalayan flavors from Uttarakhand to your home.
            Pickles, spices, cereals, murabba and traditional products made with
            quality and care.
          </p>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit UK Hills on Facebook"
            >
              <FaFacebookF aria-hidden="true" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit UK Hills on Instagram"
            >
              <FaInstagram aria-hidden="true" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit UK Hills on LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact UK Hills on WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("home")}
              >
                Home
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("products")}
              >
                Products
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("newsletter")}
              >
                Newsletter
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </button>
            </li>

            {activeOrders.length > 0 && (
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                >
                  Track Order
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-column">
          <h3>Product Categories</h3>

          <ul>
            <li>🥭 Pickles</li>
            <li>🌶️ Spices</li>
            <li>🌾 Cereals</li>
            <li>🫘 Daals</li>
            <li>🍯 Murabba</li>
            <li>🍬 Candy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact Info</h3>

          <p>
            <a href="tel:+917983524302">
              <FaPhoneAlt aria-hidden="true" />
              <span>+91 7983524302</span>
            </a>
          </p>

          <p>
            <a
              href="mailto:ukhillshimalayansanskriti06@gmail.com"
              className="footer-contact-link"
            >
              <FaEnvelope
                className="contact-icon"
                aria-hidden="true"
              />
              <span>Email Us</span>
            </a>
          </p>

          <p>
            <FaMapMarkerAlt aria-hidden="true" />
            <span>Dehradun, Uttarakhand, India</span>
          </p>

          <div className="business-hours">
            <h4>Business Hours</h4>
            <span>Mon - Sat</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 UK Hills Overseas. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
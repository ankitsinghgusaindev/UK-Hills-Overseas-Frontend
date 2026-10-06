import "./Newsletter.css";
import { useState, useEffect, useRef } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const [subscribers, setSubscribers] = useState(() => {
    try {
      const savedSubscribers = localStorage.getItem("subscribers");

      if (!savedSubscribers) {
        return [];
      }

      const parsedSubscribers = JSON.parse(savedSubscribers);

      return Array.isArray(parsedSubscribers) ? parsedSubscribers : [];
    } catch (error) {
      console.error("Failed to load subscribers", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
  }, [subscribers]);

  // Cleanup timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showMessage = (text) => {
    setMessage(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      showMessage("⚠ Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      showMessage("❌ Invalid email address");
      return;
    }

    const exists = subscribers.some(
      (subscriber) => subscriber.toLowerCase() === normalizedEmail
    );

    if (exists) {
      showMessage("📩 Email already subscribed");
      return;
    }

    setSubscribers((currentSubscribers) => [
      ...currentSubscribers,
      normalizedEmail,
    ]);

    showMessage("🎉 Successfully subscribed! Use coupon WELCOME10");

    setEmail("");
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-content">
        <span className="newsletter-tag">Join Our Community</span>

        <h2>Stay Updated With Authentic Himalayan Products</h2>

        <p>
          Get exclusive offers, discounts, new product launches, and seasonal
          deals directly in your inbox.
        </p>

        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <button type="submit">Subscribe</button>
        </form>

        {message && (
          <div
            className="newsletter-message"
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        <div className="subscriber-count">
          👥 {subscribers.length}+ Subscribers
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
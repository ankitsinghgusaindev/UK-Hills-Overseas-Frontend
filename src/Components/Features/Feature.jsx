import {
  FaLeaf,
  FaShippingFast,
  FaAward,
  FaGlobe,
} from "react-icons/fa";

import "./Feature.css";

function Features() {
  return (
    <section className="features" id="services" aria-labelledby="features-title">
      <h2 id="features-title" className="section-title">
        Why Choose Us
      </h2>

      <div className="feature-grid">
        <article className="feature-card">
          <FaLeaf
            className="feature-icon"
            aria-hidden="true"
          />
          <h3>Organic Products</h3>
        </article>

        <article className="feature-card">
          <FaShippingFast
            className="feature-icon"
            aria-hidden="true"
          />
          <h3>Worldwide Export</h3>
        </article>

        <article className="feature-card">
          <FaAward
            className="feature-icon"
            aria-hidden="true"
          />
          <h3>Premium Quality</h3>
        </article>

        <article className="feature-card">
          <FaGlobe
            className="feature-icon"
            aria-hidden="true"
          />
          <h3>Global Presence</h3>
        </article>
      </div>
    </section>
  );
}

export default Features;
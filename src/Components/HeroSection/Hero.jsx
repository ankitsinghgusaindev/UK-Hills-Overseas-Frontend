import "./Hero.css";

const scrollToSection = (id) => {
  const section = document.getElementById(id);

  if (!section) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  section.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-badge">
          🌿 Organic Himalayan Products
        </span>

        <h1>
          Bringing Uttarakhand's Authentic Taste To The World
        </h1>

        <p>
          Premium Pickles, Spices, Cereals, Murabba & More.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            className="primary-btn"
            onClick={() => scrollToSection("products")}
          >
            Explore Products
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
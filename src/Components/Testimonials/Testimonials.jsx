import "./Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "John Smith",
      country: "United Kingdom",
      review:
        "Excellent quality products and timely delivery. Highly recommended.",
    },
    {
      name: "David Wilson",
      country: "Canada",
      review:
        "Authentic Himalayan products with outstanding packaging and export support.",
    },
    {
      name: "Sarah Johnson",
      country: "Australia",
      review:
        "The pickles and spices are amazing. Looking forward to long-term business.",
    },
  ];

  return (
    <section
      className="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <h2 id="testimonials-title" className="section-title">
          What Our Clients Say
        </h2>

        <p className="section-subtitle">
          Trusted by customers worldwide.
        </p>

        <div className="testimonial-grid">
          {reviews.map((review) => (
            <article
              className="testimonial-card"
              key={review.name}
            >
              <div
                className="stars"
                aria-label="5 out of 5 stars"
                role="img"
              >
                <span aria-hidden="true">★★★★★</span>
              </div>

              <p className="review">
                "{review.review}"
              </p>

              <h4>{review.name}</h4>

              <span>{review.country}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
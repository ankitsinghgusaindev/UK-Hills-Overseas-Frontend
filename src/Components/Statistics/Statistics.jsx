import "./Statistics.css";

const Statistics = () => {
  const stats = [
    {
      number: "10K+",
      title: "Happy Customers",
    },
    {
      number: "50+",
      title: "Products",
    },
    {
      number: "25+",
      title: "Countries Served",
    },
    {
      number: "100%",
      title: "Organic Products",
    },
  ];

  return (
    <section
      className="stats-section"
      id="about"
      aria-labelledby="stats-title"
    >
      <div className="container">
        <h2 id="stats-title" className="section-title">
          Our Achievements
        </h2>

        <p className="section-subtitle">
          Delivering authentic Himalayan products across the globe.
        </p>

        <div className="stats-grid">
          {stats.map((item) => (
            <article className="stat-card" key={item.title}>
              <h3>{item.number}</h3>
              <p>{item.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
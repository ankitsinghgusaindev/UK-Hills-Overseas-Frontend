import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found" aria-labelledby="not-found-title">
      <div className="not-found-content">
        <p className="not-found-code">404</p>

        <h1 id="not-found-title">
          Page not found
        </h1>

        <p>
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <Link className="not-found-btn" to="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
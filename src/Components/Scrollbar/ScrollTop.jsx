import { useEffect, useState } from "react";
import "./ScrollTop.css";

const ScrollTop = ({ hidden }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;

      setShow((currentShow) =>
        currentShow === shouldShow ? currentShow : shouldShow
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (hidden || !show) {
    return null;
  }

  return (
    <button
      type="button"
      className="scroll-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
};

export default ScrollTop;
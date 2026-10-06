import "../../App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/HeroSection/Hero";
import Categories from "../../Components/Category/Categories";
import ProductSection from "../../Components/ProductSection/ProductSection";
import Features from "../../Components/Features/Feature";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Statistics from "../../Components/Statistics/Statistics";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Footer from "../../Components/Footer/Footer";
import WhatsappButton from "../../Components/Whatsapp/WhatsappButton";
import ScrollTop from "../../Components/Scrollbar/ScrollTop";
import CartModal from "../../Components/CartModal/CartModal";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { fetchProducts } from "../../Redux/ProductSlice";

function Home() {
  const dispatch = useDispatch();

  const { products, selectedCategory, searchTerm, loading, error } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [cartOpen, setCartOpen] = useState(false);

  const normalizedSearchTerm = searchTerm?.trim().toLowerCase() || "";

  const filteredProducts = products.filter((product) => {
    const productCategory =
      typeof product.category === "object"
        ? product.category?.name
        : product.category;

    const normalizedCategory = productCategory?.trim().toLowerCase() || "";

    const normalizedSelectedCategory =
      selectedCategory?.trim().toLowerCase() || "";

    const categoryMatch =
      normalizedSelectedCategory === "all" ||
      normalizedCategory === normalizedSelectedCategory;

    const searchableText = [product.name, product.category]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const searchMatch = searchableText.includes(normalizedSearchTerm);

    return categoryMatch && searchMatch;
  });

  return (
    <div className="app">
      <Navbar setCartOpen={setCartOpen} />

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <Hero />

      <Categories />

      <div className="search-result">
        {searchTerm && (
          <h3>
            Found {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""} for "{searchTerm}"
          </h3>
        )}
      </div>

      {loading && <p>Loading products...</p>}

      {error && <p>Unable to load products: {error}</p>}

      <ProductSection
        title={selectedCategory === "All" ? "All Products" : selectedCategory}
        products={filteredProducts}
        setCartOpen={setCartOpen}
        
      />

      <Features />
      <Testimonials />
      <Statistics />
      <Newsletter />
      <Footer />
      <WhatsappButton  hidden={cartOpen}/>
      <ScrollTop   hidden={cartOpen}/>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Home;

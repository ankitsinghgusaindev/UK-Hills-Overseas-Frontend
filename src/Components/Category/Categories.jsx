import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../Redux/ProductSlice";
import "./Category.css";

function Categories() {
  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );

  const categories = [
    "All",
    "Pickles",
    "Spices",
    "Daals",
    "Cereals",
    "Murabba",
    "Laddo",
    "Jam",
    "Candy",
  ];

  return (
    <section
      className="category-wrapper"
      aria-label="Product categories"
    >
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={`category-btn ${
            selectedCategory === category ? "active" : ""
          }`}
          aria-pressed={selectedCategory === category}
          onClick={() => dispatch(setCategory(category))}
        >
          {category}
        </button>
      ))}
    </section>
  );
}

export default Categories;
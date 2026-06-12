import { Link } from "react-router-dom";

const Sidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <aside className="w-full lg:w-64 bg-white shadow-lg p-4">

      <Link
        to="/add"
        className="block bg-indigo-600 text-white text-center py-2 rounded mb-6"
      >
        + Add Product
      </Link>

      <h2 className="font-bold text-lg mb-3">
        Categories
      </h2>

      <button
        onClick={() =>
          setSelectedCategory("all")
        }
        className={`block w-full text-left p-2 rounded mb-2 ${
          selectedCategory === "all"
            ? "bg-indigo-100"
            : ""
        }`}
      >
        All Products
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`block w-full text-left p-2 rounded mb-2 ${
            selectedCategory === category
              ? "bg-indigo-100"
              : ""
          }`}
        >
          {category}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
import { Link } from "react-router-dom";

const ProductCard = ({
  product,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">

      {/* Product Image */}
      <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-52 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">

        {/* Category */}
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="font-semibold text-gray-800 text-lg line-clamp-2 min-h-[56px]">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
          {product.description ||
            "No description available"}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>

          <span className="text-xs text-gray-400">
            Product ID: {product.id}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">

          <Link
            to={`/edit/${product.id}`}
            className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            Edit
          </Link>

          <button
            onClick={() =>
              onDelete(product.id)
            }
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;
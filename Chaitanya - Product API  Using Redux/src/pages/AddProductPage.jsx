import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import { addProduct } from "../features/products/productSlice";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(addProduct(data));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Add New Product
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new product and add it to your inventory.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <ProductForm onSubmit={handleSubmit} />
        </div>

      </div>

    </div>
  );
};

export default AddProductPage;
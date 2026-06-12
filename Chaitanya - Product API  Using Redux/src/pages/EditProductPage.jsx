import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import ProductForm from "../components/ProductForm";

import {
  updateProduct,
} from "../features/products/productSlice";

const EditProductPage = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const product = useSelector(
    (state) =>
      state.products.products.find(
        (p) => p.id === Number(id)
      )
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-red-500">
            Product Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The product you're trying to edit doesn't exist.
          </p>

        </div>

      </div>
    );
  }

  const handleSubmit = (data) => {

    dispatch(
      updateProduct({
        ...product,
        ...data,
      })
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2">
            Update product details and save changes.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
          />

        </div>

      </div>

    </div>
  );
};

export default EditProductPage;
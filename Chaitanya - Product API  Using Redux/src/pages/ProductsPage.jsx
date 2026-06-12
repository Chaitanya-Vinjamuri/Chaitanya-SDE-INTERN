import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchProducts,
  deleteProduct,
} from "../features/products/productSlice";

import {
  selectProducts,
  selectLoading,
} from "../features/products/productSelectors";

import ProductCard from "../components/ProductCard";
import ProductStats from "../components/ProductStats";
import ProductFilters from "../components/ProductFilters";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const ProductsPage = () => {

  const dispatch =
    useDispatch();

  const products =
    useSelector(selectProducts);

  const loading =
    useSelector(selectLoading);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [sortOrder,
    setSortOrder] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const categories = [
    ...new Set(
      products.map(
        (p) => p.category
      )
    ),
  ];

  let filteredProducts =
    [...products];

  if (
    selectedCategory !== "all"
  ) {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
  }

  if (searchTerm) {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
  }

  if (
    sortOrder === "priceLow"
  ) {
    filteredProducts.sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (
    sortOrder === "priceHigh"
  ) {
    filteredProducts.sort(
      (a, b) =>
        b.price - a.price
    );
  }

  if (
    sortOrder === "name"
  ) {
    filteredProducts.sort(
      (a, b) =>
        a.title.localeCompare(
          b.title
        )
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">

      <Sidebar
        categories={categories}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
      />

      <main className="flex-1 p-4 sm:p-6">

        <ProductStats
          products={products}
        />

        <ProductFilters
          searchTerm={
            searchTerm
          }
          setSearchTerm={
            setSearchTerm
          }
          sortOrder={
            sortOrder
          }
          setSortOrder={
            setSortOrder
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={(id) =>
                  dispatch(
                    deleteProduct(id)
                  )
                }
              />
            )
          )}

        </div>

      </main>

    </div>
  );
};

export default ProductsPage;
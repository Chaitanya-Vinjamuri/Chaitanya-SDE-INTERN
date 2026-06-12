const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">

      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        className="border p-2 flex-1"
      />    

      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(
            e.target.value
          )
        }
        className="border p-2"
      >
        <option value="">
          Sort
        </option>

        <option value="priceLow">
          Price Low → High
        </option>

        <option value="priceHigh">
          Price High → Low
        </option>

        <option value="name">
          Name A → Z
        </option>
      </select>

    </div>
  );
};

export default ProductFilters;
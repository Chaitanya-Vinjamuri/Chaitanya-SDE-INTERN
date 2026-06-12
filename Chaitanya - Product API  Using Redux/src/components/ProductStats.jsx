const ProductStats = ({ products }) => {

  const stats = products.reduce(
    (acc, product) => {

      acc.total++;

      acc[product.category] =
        (acc[product.category] || 0) + 1;

      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

      <div className="bg-white p-4 rounded shadow">
        <h3>Total</h3>
        <p className="text-2xl font-bold">
          {stats.total}
        </p>
      </div>

      {Object.entries(stats)
        .filter(
          ([key]) => key !== "total"
        )
        .map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-4 rounded shadow"
          >
            <h3 className="capitalize">
              {key}
            </h3>

            <p className="text-2xl font-bold">
              {value}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ProductStats;
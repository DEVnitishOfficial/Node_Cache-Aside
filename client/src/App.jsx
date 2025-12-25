import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const addProduct = async () => {
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "iPhone 15",
        price: 80000,
        category: "Mobile"
      })
    });

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Product Catalog (Redis Caching Demo)
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={fetchProducts}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Products
        </button>

        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded shadow"
          >
            <h2 className="font-bold">{p.name}</h2>
            <p>₹{p.price}</p>
            <p className="text-sm text-gray-500">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

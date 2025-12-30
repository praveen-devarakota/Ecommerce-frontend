import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-yj8d.onrender.com/api/products")
      .then((response) => {
        console.log("API response data:", response.data);

        let data = [];
        const resData = response.data;

        if (Array.isArray(resData)) {
          data = resData;
        } else if (resData && Array.isArray(resData.products)) {
          data = resData.products;
        } else if (resData && Array.isArray(resData.data)) {
          data = resData.data;
        } else {
          console.warn("Unexpected response data structure", resData);
          setErrorMsg("Unexpected data structure from API");
          return;
        }

        const limitedProducts = data.slice(0, 3);
        setProducts(limitedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setErrorMsg("Error fetching products");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-100 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center animate-fade-in-up">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Discover & Sell Amazing Products
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern platform to buy and sell unique items. Experience seamless
          shopping with elegant design and smooth animations.
        </p>
        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/buyProduct")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Buy
          </button>
          <button
            onClick={() => navigate("/sellProduct")}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg border border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Error message if any */}
      {errorMsg && (
        <p className="text-red-600 mt-4 font-semibold text-center">{errorMsg}</p>
      )}

      {/* Animated Product Showcase */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-in">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id || index}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
              style={{ animation: `fadeIn 0.6s ${(index + 1) * 0.2}s both` }}
            >
              <div
                className="w-32 h-32 bg-gradient-to-tr from-blue-200 via-blue-100 to-white rounded-full mb-4 animate-bounce-slow flex items-center justify-center overflow-hidden"
              >
                {/* Assuming product.image is a URL */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                ) : null}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name || `Product ${index + 1}`}
              </h3>
              <p className="text-gray-500">
                {product.description || "Elegant, modern, and ready to buy or sell."}
              </p>
            </div>
          ))
        ) : (
          // Fallback placeholders if no products fetched yet
          [1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
              style={{ animation: `fadeIn 0.6s ${item * 0.2}s both` }}
            >
              <div className="w-32 h-32 bg-gradient-to-tr from-blue-200 via-blue-100 to-white rounded-full mb-4 animate-bounce-slow" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Product {item}</h3>
              <p className="text-gray-500">Elegant, modern, and ready to buy or sell.</p>
            </div>
          ))
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-8px);}
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.4s infinite;
        }
      `}</style>
    </div>
  );
}

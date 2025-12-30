import React, { useState, useEffect } from "react";
import axios from "axios";

function SellProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    company: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get("http://localhost:5001/test");
        if (response.data.message === "Backend is working!") {
          setServerStatus("connected");
        }
      } catch (error) {
        console.error("Backend connection test failed:", error);
        setServerStatus("error");
      }
    };

    testConnection();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (serverStatus !== "connected") {
      alert("Cannot connect to server. Please try again later.");
      return;
    }

    setIsLoading(true);

    const { name, price, image, description, category, company } = product;

    if (!name || !price || !image || !description || !category || !company) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price");
      setIsLoading(false);
      return;
    }

    try {
      new URL(image);
    } catch (error) {
      alert("Please enter a valid image URL");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/products", {
        name,
        price: Number(price),
        image,
        description,
        category,
        company,
      });

      if (response.data.success) {
        alert("Product submitted successfully!");
        setProduct({
          name: "",
          price: "",
          image: "",
          description: "",
          category: "",
          company: "",
        });
      } else {
        alert(response.data.message || "Failed to submit product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      if (error.code === "ERR_NETWORK") {
        alert("Cannot connect to server. Please make sure the backend is running.");
      } else {
        alert(error.response?.data?.message || "Failed to submit product. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 animate-fade-slide-pulse">
        Sell a Product
      </h1>

      {serverStatus === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Connection Error!</strong>
          <span className="block sm:inline"> Cannot connect to server. Please make sure the backend is running.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-10 w-full max-w-md">

        {/* Name Input */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-800 text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          />
        </div>

        {/* Price Input */}
        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-800 text-lg font-semibold mb-2">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            value={product.price}
            onChange={handleChange}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          />
        </div>

        {/* Image URL Input */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-800 text-lg font-semibold mb-2">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter image URL"
            value={product.image}
            onChange={handleChange}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-800 text-lg font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition resize-none"
          />
        </div>

        {/* Category Input */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-800 text-lg font-semibold mb-2">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter product category"
            value={product.category}
            onChange={handleChange}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          />
        </div>

        {/* Company Input */}
        <div className="mb-8">
          <label htmlFor="company" className="block text-gray-800 text-lg font-semibold mb-2">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter company name"
            value={product.company}
            onChange={handleChange}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || serverStatus !== "connected"}
          className={`bg-blue-600 hover:bg-white border hover:text-blue-600 hover:cursor-pointer duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all w-full ${
            isLoading || serverStatus !== "connected" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}

export default SellProduct;

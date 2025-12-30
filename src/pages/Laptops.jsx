import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Laptops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroAnimated, setHeroAnimated] = useState(false);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const productHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://ecommerce-backend-yj8d.onrender.com/api/products');
      let productsData = response.data;

      if (productsData && typeof productsData === 'object' && !Array.isArray(productsData)) {
        if (productsData.products) {
          productsData = productsData.products;
        } else if (productsData.data) {
          productsData = productsData.data;
        } else if (productsData.results) {
          productsData = productsData.results;
        }
      }

      if (Array.isArray(productsData)) {
        const laptopProducts = productsData.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === 'laptops'
        );

        const processedProducts = laptopProducts.map((product) => ({
          ...product,
          image: product.image
            ? product.image.startsWith('http')
              ? product.image
              : `https://ecommerce-backend-yj8d.onrender.com${product.image.startsWith('/') ? '' : '/'}${product.image}`
            : null,
        }));

        setProducts(processedProducts);
      } else {
        setProducts([]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load laptops. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productHandler();
    setTimeout(() => setHeroAnimated(true), 100);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Added "${product.name}" to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-3 text-lg font-medium">Loading laptops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={productHandler}
              className="text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                background: 'linear-gradient(to right, #1B3A1B, #0f2e0f)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #0f2e0f, #1B3A1B)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #1B3A1B, #0f2e0f)';
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 py-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-32 left-16 w-80 h-80 bg-blue-100/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight transition-all duration-1000 ${
              heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover Our Laptops
          </h1>
          <p
            className={`text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Explore our curated collection of premium laptops designed for performance and style.
          </p>
          <div
            className={`mt-8 transition-all duration-1000 delay-500 ${
              heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href="#products"
                className="group relative inline-flex items-center text-gray-900 font-semibold text-lg hover:text-gray-700 transition-colors duration-300"
              >
                Shop Now
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {!Array.isArray(products) || products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">
            <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m8-8V4.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Laptops Available</h3>
              <p className="text-gray-500">Check back soon for exciting laptop deals!</p>
            </div>
          </div>
        ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center"
          id="products"
          style={{ placeItems: 'stretch' }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300 border border-gray-200 flex flex-col cursor-pointer"
            >
              <div className="h-40 p-4 flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-50 rounded-t-xl">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain max-h-full max-w-full transition-transform duration-700 ease-out hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center';
                    }}
                  />
                ) : (
                  <div className="text-gray-300 text-center">
                    <svg
                      className="mx-auto mb-2 w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>No Image</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col p-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-grow">{product.description}</p>
                <p className="mt-4 font-semibold text-blue-600">{formatPrice(product.price)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleAddToCart(e, product);
                  }}
                  className="cursor-pointer mt-4 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white py-2 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
}

export default Laptops;

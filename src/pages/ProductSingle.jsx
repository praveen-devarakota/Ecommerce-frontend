import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/products/${id}`);
        if (response.data.success && response.data.data) {
          setProduct(response.data.data);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="backdrop-blur-xl bg-white/80 border border-white/60 shadow-2xl rounded-3xl p-8 text-center max-w-sm w-full">
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/buyProduct')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl mx-auto">
        <div className="relative backdrop-blur-xl bg-white/50 border border-white/70 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-purple-25/20 to-pink-25/10"></div>

          <div className="relative lg:flex min-h-[450px]">
            <div className="lg:w-1/2 relative overflow-hidden bg-white/60">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 z-10"></div>
              <div className="h-full flex items-center justify-center p-6 relative">
                <div className="relative group/image">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/15 to-purple-200/15 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/350x350?text=No+Image';
                    }}
                    className="relative h-80 w-80 object-cover rounded-xl shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl border border-white/50"
                    style={{
                      filter: 'contrast(1.05) brightness(1.02) saturate(1.1)',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative z-20 p-8 flex flex-col justify-center">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md opacity-70"></div>
                    <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Premium</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-700">In Stock</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed font-light text-sm lg:text-base">
                  {product.description || "No description available for this product."}
                </p>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium text-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-3 pt-4">
                  <button
                    onClick={() => { 
                      addToCart(product); 
                      // You might want to use a toast notification instead of alert
                      alert('Product added to cart!'); 
                    }}
                    className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.395.395-.395 1.036 0 1.414L7 19M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.5" />
                      </svg>
                      <span>Add to Cart</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={() => navigate('/buyProduct')}
                    className="w-full flex items-center justify-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300 group py-2"
                  >
                    <svg className="w-4 h-4 transform group-hover:text-black group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className='hover:text-black hover:cursor-pointer'>Back to Products</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSingle;

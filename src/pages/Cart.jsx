import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromoCode = () => {
    if (promoCode.trim().toLowerCase() === "save10") {
      setPromoApplied(true);
      alert("Promo code applied successfully!");
    } else {
      setPromoApplied(false);
      alert("Invalid promo code.");
    }
  };

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500 ? 0 : 15.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const formatINR = (value) =>
    `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {!cartItems || cartItems.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-lg p-12 text-center min-h-[400px] flex flex-col justify-center">
          <div className="mb-8">
            <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-4">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h12a1 1 0 001-1v-6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
            </div>
            <div className="text-2xl mb-2">🛍️</div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart feels a little empty
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Let's fill it up with amazing products! Your perfect items are just a click away.
          </p>
          <button
            onClick={() => navigate("/buyProduct")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{formatINR(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.productId, -1)}
                    disabled={item.quantity <= 1}
                    className="p-2 border rounded disabled:opacity-50"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, 1)}
                    className="p-2 border rounded"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-4 p-2 text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 px-4 rounded transition"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            <div className="border p-4 rounded">
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <div className="flex justify-between mb-1">
                <span>Subtotal:</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Discount:</span>
                <span>-{formatINR(discount)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Shipping:</span>
                <span>{formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Tax (8%):</span>
                <span>{formatINR(tax)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatINR(total)}</span>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={applyPromoCode}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Apply
                </button>
                {promoApplied && (
                  <p className="mt-2 text-green-600 font-semibold">
                    Promo code applied!
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-indigo-600 text-white py-3 rounded text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

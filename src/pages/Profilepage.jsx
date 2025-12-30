import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
          <p className="text-center text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <FaUserCircle size={80} className="text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.username}</h2>
          <p className="text-gray-500 text-sm mt-1">Your personal profile information</p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 font-semibold">Username:</span>
            <span className="text-gray-800">{user.username}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 font-semibold">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
        </div>

        {/* Future Enhancements (editable profile/settings) */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
            onClick={() => alert('Edit profile feature coming soon!')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

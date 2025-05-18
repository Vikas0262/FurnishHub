import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiLogOut } from 'react-icons/fi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded); // Log the decoded token for debugging
      
      // Format user data with better fallbacks
      const userName = decoded.name || decoded.username || decoded.email?.split('@')[0] || 'User';
      const userEmail = decoded.email || 'No email provided';
      
      setUser({
        name: userName,
        email: userEmail,
        phone: decoded.phone || 'Not provided',
        address: decoded.address || 'Not provided',
        joinDate: new Date(decoded.iat * 1000).toLocaleDateString(),
        firstLetter: userName.charAt(0).toUpperCase()
      });
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 md:p-5 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 shadow-lg">
                <span className="text-5xl md:text-7xl font-bold text-white">
                  {user.firstLetter}
                </span>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <p className="text-purple-100 mt-2 flex items-center justify-center md:justify-start">
                  <FiMail className="mr-2" />
                  {user.email}
                </p>
                <button 
                  onClick={handleLogout}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-3 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiUser className="mr-2 text-purple-600" />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium flex items-center">
                      <FiPhone className="mr-2 text-gray-400" />
                      {user.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <FiMapPin className="mr-2 text-purple-600" />
                  Other Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium flex items-start">
                      <FiMapPin className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                      {user.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      {user.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button className="flex items-center px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <FiEdit2 className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
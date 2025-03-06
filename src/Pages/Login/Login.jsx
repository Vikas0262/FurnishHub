import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Login to your account
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email Id</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {/* Toggle Password Visibility */}
          <span
            className="absolute right-3 top-10 text-gray-600 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="text-sm text-gray-600 mb-4">
          <Link to='/forget' className="hover:text-red-500">Forgot Password?</Link>
        </div>

        {/* Login Button */}
        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition">
          LOGIN
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-4">
          Not Registered? <a href="#" className="text-red-500 hover:underline" onClick={navigate("/register")}>Sign Up</a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-200 transition">
          <FcGoogle className="text-2xl mr-2" />
          LOGIN WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;

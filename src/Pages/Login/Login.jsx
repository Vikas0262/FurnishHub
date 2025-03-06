import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
// import Header from "../component/Header/Header.jsx"

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <Header/> */}
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        {/* Title */}
        <h2 className="mb-2 text-2xl font-semibold text-center">
          Login to your account
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email Id</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {/* Toggle Password Visibility */}
          <span
            className="absolute text-gray-600 cursor-pointer right-3 top-10"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="mb-4 text-sm text-gray-600">
          <Link to='/forget' className="hover:text-red-500">Forgot Password?</Link>
        </div>

        {/* Login Button */}
        <button className="w-full py-2 font-bold text-white transition bg-red-500 rounded-lg hover:bg-red-600">
          LOGIN
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-gray-600">
          Not Registered? <a href="#" className="text-red-500 hover:underline" onClick={navigate("/register")}>Sign Up</a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button className="flex items-center justify-center w-full py-2 transition border rounded-lg hover:bg-gray-200">
          <FcGoogle className="mr-2 text-2xl" />
          LOGIN WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;

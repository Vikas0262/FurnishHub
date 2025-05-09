import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Your Password?
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email to reset your password.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email Id</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Reset Password Button */}
        <Link to="/forget">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition">
            RESET PASSWORD
          </button>
        </Link>

        {/* Back to Login */}
        <p className="text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <span
            className="text-red-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")} // Navigate to /login on click
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

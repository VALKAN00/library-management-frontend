import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { authAPI } from "../../api/AuthApi";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authAPI.signup(formData);
      // Navigate to login page after successful signup
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      {/* Card Container */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mx-4 sm:mx-0">

        {/* Header - Outside Card */}
        <div className="text-center mb-4 sm:mb-6 px-4 sm:px-0">
          <div className="flex items-center justify-center gap-2  sm:mb-3">
            <div className="bg-blue-600 rounded-full h-10 w-10 mb-1 flex items-center justify-center">
              <span
                className="material-icons text-white"
                style={{ fontSize: "24px" }}
              >
                local_library
              </span>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
            Create an Account
          </h2>

          <p className="text-xs sm:text-sm text-white">
            Join our community to borrow and reserve books.
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name  Input */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-white mb-2">
                First Name
              </label>
              <div className="relative">
                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="text-white w-full pl-10 py-2.5 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-white mb-2">
                Last Name
              </label>
              <div className="relative">
                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="text-white w-full pl-10 py-2.5 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>
          </div>
          {/* username input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <div className="relative">
              <AccountCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="your_username"
                className="text-white w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       outline-none transition-all text-sm"
                required
              />
            </div>
          </div>
          {/* email input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <div className="relative">
              <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="text-white w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="text-white w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4 sm:mt-6 text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div className="text-center mt-4">
            <span className="text-white">Already have an account? </span>
            <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

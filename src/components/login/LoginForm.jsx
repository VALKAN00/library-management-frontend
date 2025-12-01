import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../api/AuthApi'

export function LoginForm() { 
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      // The API returns { token, userId, username, role } directly
      const userData = {
        userId: response.userId,
        username: response.username,
        role: response.role,
        name: response.name || response.username
      };
      
      login(userData, response.token);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="w-full max-w-md mx-auto ">
    {/* Header - Outside Card */}
   

    {/* Card Container */}
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mx-4 sm:mx-0">
         <div className="text-center mb-4 sm:mb-6 px-4 sm:px-0">
      <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
       
        <span className="material-icons text-blue-600" style={{ fontSize: "48px" }}>
      local_library
    </span>
      </div>

      <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
        Welcome Back!
      </h2>

      <p className="text-xs sm:text-sm text-gray-600">
        Sign in to manage your library.
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

        {/* Email Input */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Password
            </label>
           
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4 sm:mt-6 text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-4"><span className='text-gray-600'>Don't have an account? </span><Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link></div>
      </form>
    </div>

  </div>
);
  }

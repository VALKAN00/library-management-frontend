import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
export function SignUpForm() {return (  
    <div className="w-full max-w-md mx-auto ">
    {/* Header - Outside Card */}
      <div className="text-center mb-4 sm:mb-6 px-4 sm:px-0">
      <div className="flex items-center justify-center gap-2  sm:mb-3">
       
 <div className="bg-blue-600 rounded-full h-10 w-10 mb-1 flex items-center justify-center">
        <span className="material-icons text-white" style={{ fontSize: "24px" }}>   
local_library
</span>
</div>
      </div>

      <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
       Create an Account
      </h2>

      <p className="text-xs sm:text-sm text-gray-600">
       Join our community to borrow and reserve books.
      </p>
    </div>

    {/* Card Container */}
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mx-4 sm:mx-0">
      
      {/* Form */}
      <form  className="space-y-4 sm:space-y-5">
        {/* Name  Input */}
        <div className='flex gap-4'>
     <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <div className="relative">
            <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="First Name"
              className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition-all text-sm"
              required
            />
          </div>
        </div>
      <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <div className="relative">
            <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition-all text-sm"
              required
            />
          </div>
        </div>
        </div>
        {/* username input */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <div className="relative">
          <AccountCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="your_username"
            className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       outline-none transition-all text-sm"
            required
          />
        </div>
      </div>
          {/* email input */}
         <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       outline-none transition-all text-sm"
            required
          />
        </div>
      </div>

        {/* Password Input */}
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       outline-none transition-all text-sm"
            required
          />
        </div>
      </div>
 
        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4 sm:mt-6 text-sm sm:text-base"
        >
         Create Account
        </button>
        <div className="text-center mt-4"><span className='text-gray-600'>Already have an account? </span><Link to="/login" className="text-blue-600 hover:underline">Sign in</Link></div>
      </form>
    </div>

  </div>
 )}


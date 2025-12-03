import { X, Check, User, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import { authAPI } from '../../api/AuthApi'


function AddAdminModal({ isOpen, onClose, onUserAdded }) {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('') // Clear error when user types
  }

  const handleConfirm = async (e) => {
    e.preventDefault() // Prevent form reload
    setLoading(true)
    setError('')
    
    try {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
        setError('All fields are required')
        setLoading(false)
        return
      }

      // Call create admin API
      await authAPI.createAdmin({
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      })
      
      setLoading(false)
      setShowSuccess(true)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      })
      
      // Notify parent component to refresh the list
      if (onUserAdded) {
        onUserAdded()
      }
    } catch (err) {
      setLoading(false)
      setError(err.message || 'Failed to add user')
      console.error('Error adding user:', err)
    }
  }

  const handleDone = () => {
    setShowSuccess(false)
    setLoading(false)
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    })
    setError('')
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={showSuccess ? handleDone : onClose}
      >
        {/* Modal */}
        <div 
          className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {!showSuccess ? (
            <>
              {/* Close Button */}
              <button
                onClick={onClose}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title */}
              {/* Note: Removed the big Refresh icon to match the cleaner look of the signup form image */}
              <h2 className="text-2xl font-bold text-white mb-6">
                Add New Admin
              </h2>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleConfirm} className="space-y-4">
                
                {/* First Name & Last Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input 
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="your_username"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-gray-500"
                    />
                  </div>
                </div>

                

                {/* Password */}
                <div className="mb-8">
                  <label className="block text-gray-400 text-sm mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors shadow-lg mt-6"
                >
                  {loading ? 'Adding Admin...' : 'Add Admin'}
                </button>

         
             
              </form>
            </>
          ) : (
            <>
              {/* Success View (Kept from original code) */}
              <div className="flex justify-center mb-6 mt-4">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white text-center mb-4">
               Admin Added!
              </h2>

              <button
                onClick={handleDone}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg mt-6"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AddAdminModal
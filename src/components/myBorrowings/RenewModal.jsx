import { X, RefreshCw, Check } from 'lucide-react'
import { useState } from 'react'

function RenewModal({ isOpen, onClose, onConfirm, book }) {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      setShowSuccess(true)
    } catch (err) {
      setLoading(false)
        console.error('Error renewing book:', err)
      // Error is handled by parent component
    }
  }

  const handleDone = () => {
    setShowSuccess(false)
    setLoading(false)
    onClose()
  }

  // Calculate new due date (14 days from today)
  const newDueDate = new Date()
  newDueDate.setDate(newDueDate.getDate() + 14)
  const formattedNewDueDate = newDueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={showSuccess ? handleDone : onClose}
      >
        {/* Modal */}
        <div 
          className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
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

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white text-center mb-3">
                Renew Book
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8">
                Are you sure you want to renew this book? Your due date will be extended.
              </p>

              {/* Book Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Book Title</span>
                  <span className="text-white font-medium text-right">{book?.Title}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Author</span>
                  <span className="text-white font-medium">{book?.Author}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">New Due Date</span>
                  <span className="text-white font-medium">{formattedNewDueDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  {loading ? 'Renewing...' : 'Confirm Renew'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success View */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Book Renewed!
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8 leading-relaxed">
                You have successfully renewed "{book?.Title}". Your new due date is {formattedNewDueDate}.
              </p>

              {/* Done Button */}
              <button
                onClick={handleDone}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
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

export default RenewModal

import { X, BookCheck, Check } from 'lucide-react'
import { useState } from 'react'

function ReturnModal({ isOpen, onClose, onConfirm, book }) {
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
      console.error('Error returning book:', err)
      // Error is handled by parent component
    }
  }

  const handleDone = () => {
    setShowSuccess(false)
    setLoading(false)
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
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <BookCheck className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white text-center mb-3">
                Return Book
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8">
                Are you sure you want to return this book? Please make sure you have returned it to the library desk.
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
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  {loading ? 'Returning...' : 'Confirm Return'}
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
                Book Returned!
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8 leading-relaxed">
                You have successfully returned "{book?.Title}". Thank you for returning the book on time!
              </p>

              {/* Done Button */}
              <button
                onClick={handleDone}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
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

export default ReturnModal

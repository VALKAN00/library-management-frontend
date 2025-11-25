import { X, BookOpen, Check } from 'lucide-react'
import { useState } from 'react'

function BorrowModal({ isOpen, onClose, book }) {
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  // Calculate due date (14 days from now)
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 14)
  const formattedDueDate = dueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleConfirmBorrow = () => {
    console.log('Confirmed borrow for:', book.title)
    // Add your borrow logic here
    setShowSuccess(true)
  }

  const handleDone = () => {
    setShowSuccess(false)
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
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white text-center mb-3">
                Confirm Your Loan
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8">
                Please confirm the details below to complete your borrow request.
              </p>

              {/* Book Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Book Title</span>
                  <span className="text-white font-medium text-right">{book.title}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Author</span>
                  <span className="text-white font-medium">{book.author}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Due By</span>
                  <span className="text-white font-medium">{formattedDueDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBorrow}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Confirm Borrow
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success View */}
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Book Borrowed!
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8 leading-relaxed">
                You have successfully borrowed "{book.title}". Please pick it up from the main desk within 3 days. Your due date is in 14 days.
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

export default BorrowModal
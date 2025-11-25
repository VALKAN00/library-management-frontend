import { X, Bookmark, Check } from 'lucide-react'
import { useState } from 'react'

function ReservationModal({ isOpen, onClose, book }) {
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleConfirmReservation = () => {
    console.log('Confirmed reservation for:', book.title)
    // Add your reservation logic here
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
          className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
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
                  <Bookmark className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white text-center mb-3">
                Confirm Your Reservation
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8">
                Please review the details below before confirming.
              </p>

              {/* Book Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Book Title</span>
                  <span className="text-white font-medium text-right">{book.title}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Author</span>
                  <span className="text-white font-medium">{book.author}</span>
                </div>
              </div>

              {/* Info Message */}
              <div className="bg-gray-700 rounded-lg p-4 mb-8">
                <p className="text-gray-300 text-sm text-center">
                  Your reservation will be held for 3 days. You will be notified when the book is ready for pickup.
                </p>
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
                  onClick={handleConfirmReservation}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Confirm Reservation
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
                Book Reserved!
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center mb-8 leading-relaxed">
                You have successfully reserved "{book.title}". You will be notified when it's ready for pickup. Your reservation is valid for 3 days.
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

export default ReservationModal
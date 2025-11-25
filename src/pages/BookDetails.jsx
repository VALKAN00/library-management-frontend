import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Star, BookOpen, Bookmark, ArrowLeft } from 'lucide-react'
import BorrowModal from '../components/BookDetails/BorrowModal'
import ReservationModal from '../components/BookDetails/ReservationModal'

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)

  // Mock data - replace with actual API call
  const book = {
    id: id,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fantasy Fiction",
    published: "2020, Viking Press",
    price: "$26.00",
    rating: 4.8,
    totalRatings: 1280,
    status: "Available",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?"
  }

  const handleBorrow = () => {
    setIsBorrowModalOpen(true)
  }

  const handleReserve = () => {
    setIsReservationModalOpen(true)
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Books</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Book Cover */}
            <div className="flex justify-center items-start">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-600 rounded-2xl transform rotate-3"></div>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="relative w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
                  {book.status === "Available" && (
                    <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  )}
                </div>
                <p className="text-xl text-indigo-600 font-medium mb-3">by {book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {book.rating} ({book.totalRatings.toLocaleString()} ratings)
                  </span>
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="text-gray-900">{book.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Published</span>
                  <span className="text-gray-900">{book.published}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Price</span>
                  <span className="text-gray-900 font-semibold">{book.price}</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Synopsis</h2>
                <p className="text-gray-700 leading-relaxed">
                  {book.synopsis}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={handleBorrow}
                  disabled={book.status !== "Available"}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                >
                  <BookOpen className="w-5 h-5" />
                  Borrow Now
                </button>
                <button
                  onClick={handleReserve}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <Bookmark className="w-5 h-5" />
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      <BorrowModal 
        isOpen={isBorrowModalOpen} 
        onClose={() => setIsBorrowModalOpen(false)} 
        book={book}
      />

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={() => setIsReservationModalOpen(false)} 
        book={book}
      />
    </div>
  )
}

export default BookDetails

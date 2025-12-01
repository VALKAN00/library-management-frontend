import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Star, BookOpen, Bookmark, ArrowLeft } from 'lucide-react'
import BorrowModal from '../components/BookDetails/BorrowModal'
import ReservationModal from '../components/BookDetails/ReservationModal'
import { booksAPI } from '../api/BooksApi'

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookDetails()
  }, [id])

  const fetchBookDetails = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await booksAPI.getById(id)
      setBook(response)
    } catch (err) {
      setError(err.message || 'Failed to fetch book details')
    } finally {
      setLoading(false)
    }
  }

  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading book details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Books</span>
          </button>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Book not found'}
          </div>
        </div>
      </div>
    )
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
                  src={book.Cover || defaultImage}
                  alt={book.Title}
                  className="relative w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover"
                  onError={(e) => {
                    if (e.target.src !== defaultImage) {
                      e.target.src = defaultImage
                    }
                  }}
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">{book.Title}</h1>
                  {book.Availability && (
                    <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  )}
                  {!book.Availability && (
                    <span className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="text-xl text-indigo-600 font-medium mb-3">by {book.Author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {book.Rating ? book.Rating.toFixed(1) : 'N/A'} / 5.0
                  </span>
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="text-gray-900">{book.Category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Published</span>
                  <span className="text-gray-900">{book.Pub_Year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Publisher</span>
                  <span className="text-gray-900">{book.Pub_Name || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Available Copies</span>
                  <span className="text-gray-900">{book.Available_Copies ?? 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Price</span>
                  <span className="text-gray-900">{book.Price} <span className="text-green-800 text-xl">$</span></span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Synopsis</h2>
                <p className="text-gray-700 leading-relaxed">
                  {book.Description || 'No description available for this book.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={handleBorrow}
                  disabled={!book.Availability}
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

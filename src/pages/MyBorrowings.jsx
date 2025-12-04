import { useState, useEffect } from 'react'
import { borrowingsAPI } from '../api/BorrowingsApi'
import { booksAPI } from '../api/BooksApi'
import RenewModal from '../components/myBorrowings/RenewModal'
import ReturnModal from '../components/myBorrowings/ReturnModal'

function MyBorrowings() {
  const [borrowings, setBorrowings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [renewModal, setRenewModal] = useState({ isOpen: false, borrowing: null })
  const [returnModal, setReturnModal] = useState({ isOpen: false, borrowing: null })

  useEffect(() => {
    fetchMyBorrowings()
  }, [])

  const fetchMyBorrowings = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await borrowingsAPI.getMyBorrowings()
      const borrowingsData = response.borrowings || []
      
      // Fetch book details for each borrowing
      const borrowingsWithBooks = await Promise.all(
        borrowingsData.map(async (borrowing) => {
          try {
            const bookData = await booksAPI.getById(borrowing.BookID)
            return {
              ...borrowing,
              bookDetails: bookData
            }
          } catch (err) {
            console.error(`Failed to fetch book ${borrowing.BookID}:`, err)
            return {
              ...borrowing,
              bookDetails: null
            }
          }
        })
      )
      
      setBorrowings(borrowingsWithBooks)
    } catch (err) {
      setError(err.message || 'Failed to fetch borrowings')
    } finally {
      setLoading(false)
    }
  }

  const calculateDaysInfo = (dueDate, returnDate) => {
    if (returnDate) return null
    
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return { status: 'overdue-severe', text: `Overdue by ${Math.abs(diffDays)} days` }
    } else if (diffDays <= 3) {
      return { status: 'overdue', text: `Due in ${diffDays} days` }
    } else {
      return { status: 'active', text: `Due in ${diffDays} days` }
    }
  }

  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

  const getStatusBadge = (status, daysInfo) => {
    if (status === "overdue") {
      return (
        <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    } else if (status === "overdue-severe") {
      return (
        <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    } else {
      return (
        <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    }
  }

  const openRenewModal = (borrowing) => {
    setRenewModal({ isOpen: true, borrowing })
  }

  const closeRenewModal = () => {
    setRenewModal({ isOpen: false, borrowing: null })
  }

  const openReturnModal = (borrowing) => {
    setReturnModal({ isOpen: true, borrowing })
  }

  const closeReturnModal = () => {
    setReturnModal({ isOpen: false, borrowing: null })
  }

  const handleConfirmRenew = async () => {
    try {
      await borrowingsAPI.renewBook(renewModal.borrowing.BorrowID)
      // Refresh the borrowings list
      await fetchMyBorrowings()
    } catch (err) {
      closeRenewModal()
      alert(err.message || 'Failed to renew book')
      throw err
    }
  }

  const handleConfirmReturn = async () => {
    try {
      await borrowingsAPI.returnBook(returnModal.borrowing.BorrowID)
      // Refresh the borrowings list
      await fetchMyBorrowings()
    } catch (err) {
      closeReturnModal()
      alert(err.message || 'Failed to return book')
      throw err
    }
  }

  const getActionButtons = (borrowing, status) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => openRenewModal(borrowing)}
          disabled={status === "overdue-severe"}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
        >
          Renew
        </button>
        <button
          onClick={() => openReturnModal(borrowing)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
        >
          Return
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">My Borrowings</h1>

      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* Table Header */}
            <thead className="bg-blue-200 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr key="loading">
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-600">
                    Loading borrowings...
                  </td>
                </tr>
              ) : error ? (
                <tr key="error">
                  <td colSpan="5" className="px-6 py-12">
                    <div className="text-center text-red-600">{error}</div>
                  </td>
                </tr>
              ) : borrowings.length === 0 ? (
                <tr key="empty">
                  <td colSpan="5" className="px-6 py-12">
                    <div className="text-center">
                      <div className="text-gray-400 mb-4">
                        <svg
                          className="mx-auto h-24 w-24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Borrowings Yet
                      </h3>
                      <p className="text-gray-600">
                        You haven't borrowed any books yet. Start exploring our collection!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                borrowings.map((borrowing) => {
                  const daysInfo = calculateDaysInfo(borrowing.DueDate, borrowing.ReturnDate)
                  const book = borrowing.bookDetails
                  
                  return (
                    <tr key={borrowing.BorrowID} className="hover:bg-gray-50 transition-colors">
                      {/* Book Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={book?.Cover || defaultImage}
                            alt={book?.Title || 'Book'}
                            className="w-12 h-16 object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              if (e.target.src !== defaultImage) {
                                e.target.src = defaultImage
                              }
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {book?.Title || 'Loading...'}
                            </h3>
                            <p className="text-sm text-gray-600">{book?.Author || ''}</p>
                          </div>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {new Date(borrowing.BorrowDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* Due Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {new Date(borrowing.DueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {daysInfo ? getStatusBadge(daysInfo.status, daysInfo.text) : (
                          <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            Returned
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        {daysInfo ? getActionButtons(borrowing, daysInfo.status) : (
                          <span className="text-gray-500 text-sm">Completed</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - Hidden on Desktop */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-600">
            Loading borrowings...
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center text-red-600">{error}</div>
          </div>
        ) : borrowings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-24 w-24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Borrowings Yet
              </h3>
              <p className="text-gray-600">
                You haven't borrowed any books yet. Start exploring our collection!
              </p>
            </div>
          </div>
        ) : (
          borrowings.map((borrowing) => {
            const daysInfo = calculateDaysInfo(borrowing.DueDate, borrowing.ReturnDate)
            const book = borrowing.bookDetails
            
            return (
              <div key={borrowing.BorrowID} className="bg-white rounded-xl shadow-lg p-4">
                {/* Book Info */}
                <div className="flex gap-4 mb-4">
                  <img
                    src={book?.Cover || defaultImage}
                    alt={book?.Title || 'Book'}
                    className="w-16 h-24 object-cover rounded-lg shadow-md flex-shrink-0"
                    onError={(e) => {
                      if (e.target.src !== defaultImage) {
                        e.target.src = defaultImage
                      }
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {book?.Title || 'Loading...'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book?.Author || ''}</p>
                    {daysInfo ? getStatusBadge(daysInfo.status, daysInfo.text) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Returned
                      </span>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Borrow Date</p>
                    <p className="text-gray-700 font-medium">
                      {new Date(borrowing.BorrowDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Due Date</p>
                    <p className="text-gray-700 font-medium">
                      {new Date(borrowing.DueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {daysInfo ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openRenewModal(borrowing)}
                      disabled={daysInfo.status === "overdue-severe"}
                      className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      Renew
                    </button>
                    <button
                      onClick={() => openReturnModal(borrowing)}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      Return
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm block text-center">Completed</span>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Modals */}
      <RenewModal
        isOpen={renewModal.isOpen}
        onClose={closeRenewModal}
        onConfirm={handleConfirmRenew}
        book={renewModal.borrowing?.bookDetails}
      />

      <ReturnModal
        isOpen={returnModal.isOpen}
        onClose={closeReturnModal}
        onConfirm={handleConfirmReturn}
        book={returnModal.borrowing?.bookDetails}
      />
    </div>
  )
}

export default MyBorrowings

import { useState, useEffect } from 'react'
import { reservationsAPI } from '../api/ReservationsApi'
import { booksAPI } from '../api/BooksApi'
import CancelReservationModal from '../components/myReservations/CancleReservationModal'
import PickupReservationModal from '../components/myReservations/PickupReservationModal'

function MyReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelModal, setCancelModal] = useState({ isOpen: false, reservation: null })
  const [pickupModal, setPickupModal] = useState({ isOpen: false, reservation: null })

  useEffect(() => {
    fetchMyReservations()
  }, [])

  const fetchMyReservations = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await reservationsAPI.getMyReservations()
      const reservationsData = response.reservations || []
      
      // Fetch book details for each reservation
      const reservationsWithBooks = await Promise.all(
        reservationsData.map(async (reservation) => {
          try {
            const bookData = await booksAPI.getById(reservation.BookID)
            return {
              ...reservation,
              bookDetails: bookData
            }
          } catch (err) {
            console.error(`Failed to fetch book ${reservation.BookID}:`, err)
            return {
              ...reservation,
              bookDetails: null
            }
          }
        })
      )
      
      setReservations(reservationsWithBooks)
    } catch (err) {
      setError(err.message || 'Failed to fetch reservations')
    } finally {
      setLoading(false)
    }
  }

  const calculateStatusInfo = (reservation) => {
    // If reservation is cancelled or completed
    if (reservation.Status === 'Cancelled') {
      return { status: 'expired', text: 'Cancelled' }
    }
    if (reservation.Status === 'Completed') {
      return { status: 'ready', text: 'Completed' }
    }
    if (reservation.Status === 'Ready') {
      return { status: 'ready', text: 'Ready for pickup' }
    }
    
    // Calculate expiry info for active reservations
    if (reservation.ExpiryDate) {
      const expiry = new Date(reservation.ExpiryDate)
      const today = new Date()
      const diffTime = expiry - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 0) {
        return { status: 'expired', text: `Expired ${Math.abs(diffDays)} days ago` }
      } else if (diffDays <= 2) {
        return { status: 'active', text: `Expires in ${diffDays} days` }
      } else {
        return { status: 'active', text: `Expires in ${diffDays} days` }
      }
    }
    
    return { status: 'active', text: 'Active' }
  }

  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

  const openCancelModal = (reservation) => {
    setCancelModal({ isOpen: true, reservation })
  }

  const closeCancelModal = () => {
    setCancelModal({ isOpen: false, reservation: null })
  }

  const openPickupModal = (reservation) => {
    setPickupModal({ isOpen: true, reservation })
  }

  const closePickupModal = () => {
    setPickupModal({ isOpen: false, reservation: null })
  }

  const handleConfirmCancel = async () => {
    try {
      await reservationsAPI.cancel(cancelModal.reservation.ReservationID)
      // Refresh the reservations list
      await fetchMyReservations()
    } catch (err) {
      closeCancelModal()
      alert(err.message || 'Failed to cancel reservation')
      throw err
    }
  }

  const handleConfirmPickup = async () => {
    try {
      await reservationsAPI.pickup(pickupModal.reservation.ReservationID)
      // Refresh the reservations list
      await fetchMyReservations()
    } catch (err) {
      closePickupModal()
      alert(err.message || 'Failed to pickup reservation')
      throw err
    }
  }

  const getStatusBadge = (status, daysInfo) => {
    if (status === "expired") {
      return (
        <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    } else if (status === "ready") {
      return (
        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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

  const getActionButtons = (reservation, status) => {
    if (status === "expired") {
      return (
        <button
          disabled
          className="px-6 py-2.5 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
        >
          Expired
        </button>
      )
    } else if (status === "ready") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => openPickupModal(reservation)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
          >
            Pickup
          </button>
          <button 
            onClick={() => openCancelModal(reservation)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
          >
            Cancel
          </button>
        </div>
      )
    }
    return (
      <button 
        onClick={() => openCancelModal(reservation)}
        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        Cancel Reservation
      </button>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">My Reservations</h1>

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
                  Reservation Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Expiry Date
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
                    Loading reservations...
                  </td>
                </tr>
              ) : error ? (
                <tr key="error">
                  <td colSpan="5" className="px-6 py-12">
                    <div className="text-center text-red-600">{error}</div>
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
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
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Reservations Yet
                      </h3>
                      <p className="text-gray-600">
                        You haven't reserved any books yet. Start exploring our collection!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => {
                  const statusInfo = calculateStatusInfo(reservation)
                  const book = reservation.bookDetails
                  
                  return (
                    <tr key={reservation.ReservationID} className="hover:bg-gray-50 transition-colors">
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

                      {/* Reservation Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {new Date(reservation.ReservationDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* Expiry Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {reservation.ExpiryDate ? new Date(reservation.ExpiryDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(statusInfo.status, statusInfo.text)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        {getActionButtons(reservation, statusInfo.status)}
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
            Loading reservations...
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center text-red-600">{error}</div>
          </div>
        ) : reservations.length === 0 ? (
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reservations Yet
              </h3>
              <p className="text-gray-600">
                You haven't reserved any books yet. Start exploring our collection!
              </p>
            </div>
          </div>
        ) : (
          reservations.map((reservation) => {
            const statusInfo = calculateStatusInfo(reservation)
            const book = reservation.bookDetails
            
            return (
              <div key={reservation.ReservationID} className="bg-white rounded-xl shadow-lg p-4">
                {/* Book Info */}
                <div className="flex gap-4 mb-4">
                  <img
                    src={book?.Cover || defaultImage}
                    alt={book?.Title || 'Book'}
                    className="w-16 h-24 object-cover rounded-lg shadow-md shrink-0"
                    onError={(e) => {
                      if (e.target.src !== defaultImage) {
                        e.target.src = defaultImage
                      }
                    }}
                  />
                  <div className="grow">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {book?.Title || 'Loading...'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book?.Author || ''}</p>
                    {getStatusBadge(statusInfo.status, statusInfo.text)}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Reservation Date</p>
                    <p className="text-gray-700 font-medium">
                      {new Date(reservation.ReservationDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Expiry Date</p>
                    <p className="text-gray-700 font-medium">
                      {reservation.ExpiryDate ? new Date(reservation.ExpiryDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {statusInfo.status === "expired" ? (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed text-sm"
                  >
                    Expired
                  </button>
                ) : statusInfo.status === "ready" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPickupModal(reservation)}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      Pickup
                    </button>
                    <button 
                      onClick={() => openCancelModal(reservation)}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => openCancelModal(reservation)}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Modals */}
      <CancelReservationModal
        isOpen={cancelModal.isOpen}
        onClose={closeCancelModal}
        onConfirm={handleConfirmCancel}
        book={cancelModal.reservation?.bookDetails}
      />

      <PickupReservationModal
        isOpen={pickupModal.isOpen}
        onClose={closePickupModal}
        onConfirm={handleConfirmPickup}
        book={pickupModal.reservation?.bookDetails}
      />
    </div>
  )
}

export default MyReservations

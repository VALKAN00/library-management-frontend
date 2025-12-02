import { useState, useEffect, useCallback } from "react"
import { Calendar, BookOpen, Clock } from "lucide-react"
import { historyAPI } from "../api/HistoryApi"
import { booksAPI } from "../api/BooksApi"

function UserHistory() {
  const [activeTab, setActiveTab] = useState("borrowings") // 'borrowings' or 'reservations'
  const [borrowingHistory, setBorrowingHistory] = useState([])
  const [reservationHistory, setReservationHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (activeTab === "borrowings") {
        const response = await historyAPI.getBorrowingHistory()
        // API returns object with history property containing the array
        const borrowings = response.history || []

        // Fetch book details for each borrowing
        const borrowingsWithBooks = await Promise.all(
          borrowings.map(async (borrowing) => {
            try {
              const bookResponse = await booksAPI.getById(borrowing.BookID)
              return {
                ...borrowing,
                bookTitle: bookResponse.Title,
                author: bookResponse.Author,
                coverImage: bookResponse.BookCover
              }
            } catch (err) {
              console.error(`Error fetching book ${borrowing.BookID}:`, err)
              return {
                ...borrowing,
                bookTitle: "Unknown Book",
                author: "Unknown Author",
                coverImage: null
              }
            }
          })
        )

        setBorrowingHistory(borrowingsWithBooks)
      } else {
        const response = await historyAPI.getReservationHistory()
        // API returns object with history property containing the array
        const reservations = response.history || []

        // Fetch book details for each reservation
        const reservationsWithBooks = await Promise.all(
          reservations.map(async (reservation) => {
            try {
              const bookResponse = await booksAPI.getById(reservation.BookID)
              return {
                ...reservation,
                bookTitle: bookResponse.Title,
                author: bookResponse.Author,
                coverImage: bookResponse.BookCover
              }
            } catch (err) {
              console.error(`Error fetching book ${reservation.BookID}:`, err)
              return {
                ...reservation,
                bookTitle: "Unknown Book",
                author: "Unknown Author",
                coverImage: null
              }
            }
          })
        )

        setReservationHistory(reservationsWithBooks)
      }
    } catch (err) {
      console.error("Error fetching history:", err)
      setError(err.response?.data?.message || "Failed to load history")
    } finally {
      setLoading(false)
    }
  }, [activeTab])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    })
  }

  const calculateDaysOverdue = (dueDate, returnDate) => {
    if (!dueDate || !returnDate) return 0
    const due = new Date(dueDate)
    const returned = new Date(returnDate)
    const diffTime = returned - due
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getBorrowingStatus = (returnDate, dueDate) => {
    if (!returnDate) return "borrowed"
    const overdueDays = calculateDaysOverdue(dueDate, returnDate)
    return overdueDays > 0 ? "overdue" : "returned"
  }

  const defaultImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNFNUU3RUIiLz4KICA8cGF0aCBkPSJNMjAwIDI1MEMyMTEuMDQ2IDI1MCAyMjAgMjQxLjA0NiAyMjAgMjMwQzIyMCAyMTguOTU0IDIxMS4wNDYgMjEwIDIwMCAyMTBDMTg4Ljk1NCAyMTAgMTgwIDIxOC45NTQgMTgwIDIzMEMxODAgMjQxLjA0NiAxODguOTU0IDI1MCAyMDAgMjUwWiIgZmlsbD0iIzlDQTNCMCIvPgogIDxwYXRoIGQ9Ik0yNTAgMzUwQzI1MCAzMjIuMzg2IDIyNy42MTQgMzAwIDIwMCAzMDBDMTcyLjM4NiAzMDAgMTUwIDMyMi4zODYgMTUwIDM1MEMxNTAgMzU1LjUyMyAxNTQuNDc3IDM2MCAxNjAgMzYwSDI0MEMyNDUuNTIzIDM2MCAyNTAgMzU1LjUyMyAyNTAgMzUwWiIgZmlsbD0iIzlDQTNCMCIvPgo8L3N2Zz4="

  const getBorrowingStatusBadge = (status, daysOverdue = 0) => {
    if (status === "returned") {
      return (
        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Returned On Time
        </span>
      )
    } else if (status === "borrowed") {
      return (
        <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Borrowed
        </span>
      )
    }else if (status === "overdue") {
      return (
        <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Returned Late ({daysOverdue} days overdue)
        </span>
      )
    }
  }

  const getReservationStatusBadge = (status) => {
    return (
      <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        {status}
      </span>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My History</h1>
        <p className="text-gray-600">View your previous borrowings and reservations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("borrowings")}
          className={`pb-4 px-6 font-semibold transition-colors relative ${
            activeTab === "borrowings"
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen size={20} />
            Borrowing History
          </div>
          {activeTab === "borrowings" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("reservations")}
          className={`pb-4 px-6 font-semibold transition-colors relative ${
            activeTab === "reservations"
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar size={20} />
            Reservation History
          </div>
          {activeTab === "reservations" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800 font-semibold mb-2">Error loading history</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Borrowing History Table */}
      {!loading && !error && activeTab === "borrowings" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
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
                    Return Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {borrowingHistory.map((record) => {
                  const status = getBorrowingStatus(record.ReturnedDate, record.DueDate)
                  const daysOverdue = calculateDaysOverdue(record.DueDate, record.ReturnedDate)
                  
                  return (
                    <tr key={record.BorrowID} className="hover:bg-gray-50 transition-colors">
                      {/* Book Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={record.BookCover || defaultImage}
                            alt={record.bookTitle}
                            className="w-12 h-16 object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              if (e.target.src !== defaultImage) {
                                e.target.src = defaultImage
                              }
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {record.bookTitle}
                            </h3>
                            <p className="text-sm text-gray-600">{record.author}</p>
                          </div>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={16} className="text-gray-400" />
                          <span>{formatDate(record.BorrowDate)}</span>
                        </div>
                      </td>

                      {/* Due Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{formatDate(record.DueDate)}</span>
                      </td>

                      {/* Return Date */}
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          status === "returned-late" ? "text-red-600" : "text-gray-700"
                        }`}>
                          {formatDate(record.ReturnDate)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getBorrowingStatusBadge(record.Status, daysOverdue)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State for Borrowings */}
          {borrowingHistory.length === 0 && (
            <div className="p-12 text-center">
              <BookOpen className="mx-auto h-24 w-24 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Borrowing History
              </h3>
              <p className="text-gray-600">
                You haven't borrowed any books yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Reservation History Table */}
      {!loading && !error && activeTab === "reservations" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservationHistory.map((record) => (
                  <tr key={record.ReservationID} className="hover:bg-gray-50 transition-colors">
                    {/* Book Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={record.BookCover || defaultImage}
                          alt={record.bookTitle}
                          className="w-12 h-16 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            if (e.target.src !== defaultImage) {
                              e.target.src = defaultImage
                            }
                          }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {record.bookTitle}
                          </h3>
                          <p className="text-sm text-gray-600">{record.author}</p>
                        </div>
                      </div>
                    </td>

                    {/* Reservation Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{formatDate(record.ReservationDate)}</span>
                      </div>
                    </td>

                    {/* Expiry Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{formatDate(record.ReservationExpiryDate)}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getReservationStatusBadge(record.Status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State for Reservations */}
          {reservationHistory.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="mx-auto h-24 w-24 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reservation History
              </h3>
              <p className="text-gray-600">
                You haven't made any reservations yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserHistory

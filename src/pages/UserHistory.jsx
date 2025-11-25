import { useState } from "react"
import { Calendar, BookOpen, Clock } from "lucide-react"

function UserHistory() {
  const [activeTab, setActiveTab] = useState("borrowings") // 'borrowings' or 'reservations'

  // Mock data for borrowing history
  const borrowingHistory = [
    {
      id: 1,
      bookTitle: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      borrowDate: "Mar 10, 2025",
      dueDate: "Apr 10, 2025",
      returnDate: "Apr 8, 2025",
      status: "returned",
      daysOverdue: 0
    },
    {
      id: 2,
      bookTitle: "Atomic Habits",
      author: "James Clear",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      borrowDate: "Feb 15, 2025",
      dueDate: "Mar 15, 2025",
      returnDate: "Mar 20, 2025",
      status: "returned-late",
      daysOverdue: 5
    },
    {
      id: 3,
      bookTitle: "Dune",
      author: "Frank Herbert",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      borrowDate: "Jan 20, 2025",
      dueDate: "Feb 20, 2025",
      returnDate: "Feb 18, 2025",
      status: "returned",
      daysOverdue: 0
    },
    {
      id: 4,
      bookTitle: "The Psychology of Money",
      author: "Morgan Housel",
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
      borrowDate: "Jan 5, 2025",
      dueDate: "Feb 5, 2025",
      returnDate: "Feb 5, 2025",
      status: "returned",
      daysOverdue: 0
    },
    {
      id: 5,
      bookTitle: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      borrowDate: "Dec 10, 2024",
      dueDate: "Jan 10, 2025",
      returnDate: "Jan 15, 2025",
      status: "returned-late",
      daysOverdue: 5
    }
  ]

  // Mock data for reservation history
  const reservationHistory = [
    {
      id: 1,
      bookTitle: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      reservationDate: "Apr 1, 2025",
      expiryDate: "Apr 8, 2025",
      status: "picked-up",
      pickedUpDate: "Apr 5, 2025"
    },
    {
      id: 2,
      bookTitle: "Sapiens",
      author: "Yuval Noah Harari",
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
      reservationDate: "Mar 15, 2025",
      expiryDate: "Mar 22, 2025",
      status: "expired",
      pickedUpDate: null
    },
    {
      id: 3,
      bookTitle: "The Name of the Wind",
      author: "Patrick Rothfuss",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      reservationDate: "Feb 20, 2025",
      expiryDate: "Feb 27, 2025",
      status: "picked-up",
      pickedUpDate: "Feb 22, 2025"
    },
    {
      id: 4,
      bookTitle: "The Lean Startup",
      author: "Eric Ries",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      reservationDate: "Jan 10, 2025",
      expiryDate: "Jan 17, 2025",
      status: "cancelled",
      pickedUpDate: null
    }
  ]

  const getStatusBadge = (status, daysOverdue = 0) => {
    if (status === "returned") {
      return (
        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Returned On Time
        </span>
      )
    } else if (status === "returned-late") {
      return (
        <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Returned Late ({daysOverdue} days)
        </span>
      )
    } else if (status === "picked-up") {
      return (
        <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Picked Up
        </span>
      )
    } else if (status === "expired") {
      return (
        <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Expired
        </span>
      )
    } else if (status === "cancelled") {
      return (
        <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
          Cancelled
        </span>
      )
    }
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

      {/* Borrowing History Table */}
      {activeTab === "borrowings" && (
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
                {borrowingHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    {/* Book Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={record.coverImage}
                          alt={record.bookTitle}
                          className="w-12 h-16 object-cover rounded-lg shadow-md"
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
                        <span>{record.borrowDate}</span>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{record.dueDate}</span>
                    </td>

                    {/* Return Date */}
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        record.status === "returned-late" ? "text-red-600" : "text-gray-700"
                      }`}>
                        {record.returnDate}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(record.status, record.daysOverdue)}
                    </td>
                  </tr>
                ))}
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
      {activeTab === "reservations" && (
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
                    Picked Up Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservationHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    {/* Book Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={record.coverImage}
                          alt={record.bookTitle}
                          className="w-12 h-16 object-cover rounded-lg shadow-md"
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
                        <span>{record.reservationDate}</span>
                      </div>
                    </td>

                    {/* Expiry Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{record.expiryDate}</span>
                    </td>

                    {/* Picked Up Date */}
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        record.pickedUpDate ? "text-blue-600" : "text-gray-400"
                      }`}>
                        {record.pickedUpDate || "N/A"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(record.status)}
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

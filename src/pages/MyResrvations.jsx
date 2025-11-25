function MyReservations() {
  // Mock data - replace with actual API call
  const reservations = [
    {
      id: 1,
      bookTitle: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      reservationDate: "Nov 20, 2025",
      expiryDate: "Nov 27, 2025",
      status: "active",
      daysInfo: "Expires in 2 days"
    },
    {
      id: 2,
      bookTitle: "Dune",
      author: "Frank Herbert",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      reservationDate: "Nov 22, 2025",
      expiryDate: "Nov 29, 2025",
      status: "active",
      daysInfo: "Expires in 4 days"
    },
    {
      id: 3,
      bookTitle: "The Name of the Wind",
      author: "Patrick Rothfuss",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      reservationDate: "Nov 15, 2025",
      expiryDate: "Nov 22, 2025",
      status: "expired",
      daysInfo: "Expired 3 days ago"
    },
    {
      id: 4,
      bookTitle: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
      reservationDate: "Nov 23, 2025",
      expiryDate: "Nov 30, 2025",
      status: "ready",
      daysInfo: "Ready for pickup"
    }
  ]

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

  const getActionButton = (status) => {
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
        <button className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
          Pickup Book
        </button>
      )
    }
    return (
      <button className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
        Cancel Reservation
      </button>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Reservations</h1>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                  {/* Book Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={reservation.coverImage}
                        alt={reservation.bookTitle}
                        className="w-12 h-16 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {reservation.bookTitle}
                        </h3>
                        <p className="text-sm text-gray-600">{reservation.author}</p>
                      </div>
                    </div>
                  </td>

                  {/* Reservation Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{reservation.reservationDate}</span>
                  </td>

                  {/* Expiry Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{reservation.expiryDate}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {getStatusBadge(reservation.status, reservation.daysInfo)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    {getActionButton(reservation.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State (if no reservations) */}
      {reservations.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
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
      )}
    </div>
  )
}

export default MyReservations

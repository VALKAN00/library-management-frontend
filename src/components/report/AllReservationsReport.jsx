function AllReservationsReport({ data, dateRange }) {
  const getStatusBadge = (status) => {
    if (status === "active") {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          Active
        </span>
      )
    } else if (status === "picked-up") {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          Picked Up
        </span>
      )
    } else if (status === "expired") {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
          Expired
        </span>
      )
    } else {
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
          Cancelled
        </span>
      )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">All Reservations Report</h2>
          <span className="text-gray-600">{dateRange}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Member Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Book Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Reservation Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{reservation.memberName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{reservation.bookTitle}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{reservation.author}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{reservation.reservationDate}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{reservation.expiryDate}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(reservation.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllReservationsReport

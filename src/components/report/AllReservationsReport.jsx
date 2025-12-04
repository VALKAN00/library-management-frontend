function AllReservationsReport({ data, dateRange }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const getStatusBadge = (status) => {
    if (status === "reserved") {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          Reserved
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
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">All Reservations Report</h2>
          <span className="text-sm md:text-base text-gray-600">{dateRange}</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Member ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Book ID
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
              <tr key={reservation.ReservationID} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{reservation.CusID || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{reservation.BookID || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">-</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{formatDate(reservation.ReservationExpiryDate)}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(reservation.Status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {data.map((reservation) => (
          <div key={reservation.ReservationID} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Book ID: {reservation.BookID || 'N/A'}
                </h3>
                <p className="text-xs text-gray-600">
                  Member: {reservation.CusID || 'N/A'}
                </p>
              </div>
              {getStatusBadge(reservation.Status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Reserved:</span>
                <div className="font-medium text-gray-900">{formatDate(reservation.ReservationDate)}</div>
              </div>
              <div>
                <span className="text-gray-500">Expires:</span>
                <div className="font-medium text-gray-900">{formatDate(reservation.ReservationExpiryDate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllReservationsReport

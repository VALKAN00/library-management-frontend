function AllBorrowingsReport({ data, dateRange }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const getStatusBadge = (borrowing) => {
    if (borrowing.ReturnDate) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          Returned
        </span>
      )
    } else if (borrowing.Returnable) {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          Borrowed
        </span>
      )
    } else {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
          Borrowed
        </span>
      )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">All Borrowings Report</h2>
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
                Borrow Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((borrowing) => (
              <tr key={borrowing.BorrowID} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{borrowing.CusID || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{borrowing.BookID || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{formatDate(borrowing.BorrowDate)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{formatDate(borrowing.DueDate)}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(borrowing)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {data.map((borrowing) => (
          <div key={borrowing.BorrowID} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Book ID: {borrowing.BookID || 'N/A'}
                </h3>
                <p className="text-xs text-gray-600">
                  Member: {borrowing.CusID || 'N/A'}
                </p>
              </div>
              {getStatusBadge(borrowing)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Borrowed:</span>
                <div className="font-medium text-gray-900">{formatDate(borrowing.BorrowDate)}</div>
              </div>
              <div>
                <span className="text-gray-500">Due:</span>
                <div className="font-medium text-gray-900">{formatDate(borrowing.DueDate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBorrowingsReport

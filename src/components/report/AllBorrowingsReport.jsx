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
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">All Borrowings Report</h2>
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
                  <span className="text-gray-700">-</span>
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
    </div>
  )
}

export default AllBorrowingsReport

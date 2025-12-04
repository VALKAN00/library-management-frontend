function MemberActivityReport({ data, dateRange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Member Activity Report</h2>
          <span className="text-sm md:text-base text-gray-600">{dateRange}</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Member Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Total Borrowings
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Active Borrowings
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Total Reservations
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Returned Books
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Overdue Books
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{member.name || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{member.UserName || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{member.totalBorrowings || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-semibold">{member.activeBorrowings || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{member.totalReservations || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600 font-semibold">{member['Returned Books'] || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-red-600 font-semibold">{member.overdueBooks || 0}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {data.map((member) => (
          <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="mb-3 pb-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                {member.name || 'N/A'}
              </h3>
              <p className="text-sm text-gray-600">@{member.UserName || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <span className="text-gray-600">Total Borrowings</span>
                <div className="font-bold text-blue-600 text-lg">{member.totalBorrowings || 0}</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded">
                <span className="text-gray-600">Active Borrowings</span>
                <div className="font-bold text-indigo-600 text-lg">{member.activeBorrowings || 0}</div>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <span className="text-gray-600">Total Reservations</span>
                <div className="font-bold text-purple-600 text-lg">{member.totalReservations || 0}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <span className="text-gray-600">Returned Books</span>
                <div className="font-bold text-green-600 text-lg">{member['Returned Books'] || 0}</div>
              </div>
              <div className="bg-red-50 p-2 rounded">
                <span className="text-gray-600">Overdue Books</span>
                <div className="font-bold text-red-600 text-lg">{member.overdueBooks || 0}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemberActivityReport

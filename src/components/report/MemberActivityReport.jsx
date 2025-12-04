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
                Member ID
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
                returned books
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((member) => (
              <tr key={member.CusID} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{member.CusID || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{member.borrow_count}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-semibold">-</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">-</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600 font-semibold">
                    0
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {data.map((member) => (
          <div key={member.CusID} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                Member ID: {member.CusID || 'N/A'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <span className="text-gray-600">Total Borrowings</span>
                <div className="font-bold text-blue-600 text-lg">{member.borrow_count}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <span className="text-gray-600">Overdue Books</span>
                <div className="font-bold text-green-600 text-lg">0</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemberActivityReport

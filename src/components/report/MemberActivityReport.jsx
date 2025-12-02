function MemberActivityReport({ data, dateRange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Member Activity Report</h2>
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
                Email
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
                Overdue Books
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
                  <span className="text-gray-700">-</span>
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
    </div>
  )
}

export default MemberActivityReport

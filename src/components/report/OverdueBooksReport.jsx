function OverdueBooksReport({ data, dateRange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Overdue Books Report</h2>
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
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Days Overdue
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Fine Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((borrowing) => (
              <tr key={borrowing.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{borrowing.memberName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{borrowing.bookTitle}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{borrowing.dueDate}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-red-600 font-bold">{borrowing.daysOverdue} days</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-red-600 font-bold">${borrowing.fineAmount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {data.map((borrowing) => (
          <div key={borrowing.id} className="bg-white border border-red-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {borrowing.bookTitle}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{borrowing.author}</p>
                <p className="text-xs text-gray-600">
                  Member: {borrowing.memberName}
                </p>
              </div>
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold shrink-0">
                ${borrowing.fineAmount}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Due Date:</span>
                <div className="font-medium text-gray-900">{borrowing.dueDate}</div>
              </div>
              <div>
                <span className="text-gray-500">Days Overdue:</span>
                <div className="font-bold text-red-600">{borrowing.daysOverdue} days</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverdueBooksReport

function OverdueBooksReport({ data, dateRange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Overdue Books Report</h2>
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
                  <span className="text-gray-700">{borrowing.author}</span>
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
    </div>
  )
}

export default OverdueBooksReport

function PopularBooksReport({ data, dateRange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Popular Books Report</h2>
          <span className="text-gray-600">{dateRange}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Book Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Total Borrows
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((book, index) => (
              <tr key={book.BookID} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-2xl font-bold text-indigo-600">{index + 1}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold">{book.Title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{book.Author}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{book.Genre || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-bold text-lg">{book.times}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PopularBooksReport

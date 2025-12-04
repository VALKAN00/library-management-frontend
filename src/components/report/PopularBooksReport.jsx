function PopularBooksReport({ data, dateRange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Books Report</h2>
          <span className="text-sm md:text-base text-gray-600">{dateRange}</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
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
                  <span className="text-gray-900 font-bold text-lg">{book.times}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {data.map((book, index) => (
          <div key={book.BookID} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl font-bold text-indigo-600 shrink-0">#{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {book.Title}
                  </h3>
                  <p className="text-xs text-gray-600">{book.Author}</p>
                </div>
              </div>
              <span className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold shrink-0">
                {book.times}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Genre:</span> {book.Genre || 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularBooksReport

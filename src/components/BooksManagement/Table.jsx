import { Edit, Trash2, BookOpen } from "lucide-react"

function Table({ filteredBooks, handleOpenDialog, handleDeleteBook, searchTerm, genreFilter }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book.BookID} className="hover:bg-gray-50 transition-colors">
                {/* Book Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={book.Cover || "https://via.placeholder.com/150x200?text=No+Cover"}
                      alt={book.Title}
                      className="w-12 h-16 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/150x200?text=No+Cover"
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {book.Title}
                      </h3>
                      <p className="text-sm text-gray-600">{book.Author}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {book.Category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700">{book.Pub_Name}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700">{book.Pub_Year}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700 font-semibold">${book.Price}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700 font-semibold">{book.Quantity}</span>
                </td>

                <td className="px-6 py-4">
                  <span className={`font-semibold ${book.Available_Copies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {book.Available_Copies}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDialog("edit", book)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                      title="Edit Book"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.BookID)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                      title="Delete Book"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {filteredBooks.map((book) => (
          <div key={book.BookID} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex gap-3 p-4">
              <img
                src={book.Cover || "https://via.placeholder.com/150x200?text=No+Cover"}
                alt={book.Title}
                className="w-16 h-24 object-cover rounded-lg shadow-md shrink-0"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://via.placeholder.com/150x200?text=No+Cover"
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                  {book.Title}
                </h3>
                <p className="text-xs text-gray-600 mb-2 truncate">{book.Author}</p>
                <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  {book.Category}
                </span>
              </div>
            </div>
            
            <div className="px-4 pb-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Publisher:</span>
                <div className="font-medium text-gray-900 truncate">{book.Pub_Name}</div>
              </div>
              <div>
                <span className="text-gray-500">Year:</span>
                <div className="font-medium text-gray-900">{book.Pub_Year}</div>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <div className="font-semibold text-gray-900">${book.Price}</div>
              </div>
              <div>
                <span className="text-gray-500">Quantity:</span>
                <div className="font-semibold text-gray-900">{book.Quantity}</div>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Available: </span>
                <span className={`font-semibold ${book.Available_Copies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.Available_Copies} copies
                </span>
              </div>
            </div>

            <div className="flex gap-2 p-3 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => handleOpenDialog("edit", book)}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteBook(book.BookID)}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="p-12 text-center">
          <BookOpen className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Books Found
          </h3>
          <p className="text-gray-600">
            {searchTerm || genreFilter !== "all" 
              ? "Try adjusting your search or filters" 
              : "Start by adding your first book to the library"}
          </p>
        </div>
      )}
    </div>
  )
}

export default Table
import { Edit, Trash2, BookOpen } from "lucide-react"

function Table({ filteredBooks, handleOpenDialog, handleDeleteBook, searchTerm, genreFilter }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Year
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
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                {/* Book Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700 text-sm">{book.isbn}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {book.genre}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700">{book.publisher}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700">{book.year}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-gray-700 font-semibold">{book.quantity}</span>
                </td>

                <td className="px-6 py-4">
                  <span className={`font-semibold ${book.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {book.available}
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
                      onClick={() => handleDeleteBook(book.id)}
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

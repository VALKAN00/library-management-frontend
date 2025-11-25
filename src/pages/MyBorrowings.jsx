function MyBorrowings() {
  // Mock data - replace with actual API call
  const borrowings = [
    {
      id: 1,
      bookTitle: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      borrowDate: "Apr 15, 2024",
      dueDate: "May 15, 2024",
      status: "overdue",
      daysInfo: "Due in 3 days"
    },
    {
      id: 2,
      bookTitle: "Dune",
      author: "Frank Herbert",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      borrowDate: "Apr 30, 2024",
      dueDate: "May 30, 2024",
      status: "active",
      daysInfo: "Due in 15 days"
    },
    {
      id: 3,
      bookTitle: "The Name of the Wind",
      author: "Patrick Rothfuss",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      borrowDate: "Apr 1, 2024",
      dueDate: "May 1, 2024",
      status: "overdue-severe",
      daysInfo: "Overdue by 11 days"
    },
    {
      id: 4,
      bookTitle: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
      borrowDate: "May 5, 2024",
      dueDate: "June 5, 2024",
      status: "active",
      daysInfo: "Due in 24 days"
    }
  ]

  const getStatusBadge = (status, daysInfo) => {
    if (status === "overdue") {
      return (
        <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    } else if (status === "overdue-severe") {
      return (
        <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    } else {
      return (
        <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {daysInfo}
        </span>
      )
    }
  }

  const getActionButton = (status) => {
    if (status === "overdue-severe") {
      return (
        <button
          disabled
          className="px-6 py-2.5 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
        >
          Renew Unavailable
        </button>
      )
    }
    return (
      <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
        Renew Book
      </button>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Borrowings</h1>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* Table Header */}
            <thead className="bg-blue-200 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {borrowings.map((borrowing) => (
                <tr key={borrowing.id} className="hover:bg-gray-50 transition-colors">
                  {/* Book Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={borrowing.coverImage}
                        alt={borrowing.bookTitle}
                        className="w-12 h-16 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {borrowing.bookTitle}
                        </h3>
                        <p className="text-sm text-gray-600">{borrowing.author}</p>
                      </div>
                    </div>
                  </td>

                  {/* Borrow Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{borrowing.borrowDate}</span>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{borrowing.dueDate}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {getStatusBadge(borrowing.status, borrowing.daysInfo)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    {getActionButton(borrowing.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State (if no borrowings) */}
      {borrowings.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Borrowings Yet
          </h3>
          <p className="text-gray-600">
            You haven't borrowed any books yet. Start exploring our collection!
          </p>
        </div>
      )}
    </div>
  )
}

export default MyBorrowings

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Library Management System</h1>
      <p className="text-lg mb-4">Welcome to the Library Management System</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Manage Books</h2>
          <p className="text-gray-600">Add, edit, and view all books in the library</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Manage Members</h2>
          <p className="text-gray-600">Keep track of library members</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Borrowing Records</h2>
          <p className="text-gray-600">Track book borrowing and returns</p>
        </div>
      </div>
    </div>
  )
}

export default Home

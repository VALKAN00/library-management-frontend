import { useState, useEffect } from 'react'
import BooksCard from "../components/browseBooks/BooksCard"
import { booksAPI } from '../api/BooksApi'

function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await booksAPI.getAll()
      console.log('Books API Response:', response)
      // API returns object with books array
      setBooks(response.books || [])
    } catch (err) {
      console.error('Error fetching books:', err)
      setError(err.message || 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading books...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <BooksCard
              key={book.BookID}
              id={book.BookID}
              title={book.Title}
              author={book.Author}
              genre={book.Category}
              date={book.Pub_Year}
              coverImage={book.Cover}
              rating={book.Rating}
              status={book.Availability ? "Available" : "Unavailable"}
              price={book.Price}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-600">
            No books found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Books

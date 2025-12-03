import { useState, useEffect, useCallback } from 'react'
import BooksCard from "../components/browseBooks/BooksCard"
import BooksFilter from "../components/browseBooks/BooksFilter"
import { booksAPI } from '../api/BooksApi'

function Books() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])

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
      const booksData = response.books || []
      setBooks(booksData)
      setFilteredBooks(booksData)
      
      // Extract unique categories
      const uniqueCategories = [...new Set(booksData.map(book => book.Category).filter(Boolean))]
      setCategories(uniqueCategories)
    } catch (err) {
      console.error('Error fetching books:', err)
      setError(err.message || 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = useCallback((filters) => {
    let filtered = [...books]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(book =>
        book.Title?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(book => book.Category === filters.category)
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(book => parseFloat(book.Price) >= parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(book => parseFloat(book.Price) <= parseFloat(filters.maxPrice))
    }

    setFilteredBooks(filtered)
  }, [books])

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">Discover your next great read</p>
      </div>

      <BooksFilter onFilterChange={handleFilterChange} categories={categories} />

      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredBooks.length}</span> of <span className="font-semibold">{books.length}</span> books
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
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
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-600 mb-2">No books found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Books

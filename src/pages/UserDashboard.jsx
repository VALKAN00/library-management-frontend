import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import UserBooksCard from "../components/userDashboard/UserBooksCard";
import StatusCard from "../components/userDashboard/StatusCard";
import { BookOpen, Bookmark, RotateCcw } from 'lucide-react';
import { borrowingsAPI } from '../api/BorrowingsApi';
import { reservationsAPI } from '../api/ReservationsApi';
import { booksAPI } from '../api/BooksApi';

const bookIcon = <BookOpen />;
const bookmarkIcon = <Bookmark />;
const returnIcon = <RotateCcw />;

export default function UserDashboard() {  
  const location = useLocation()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [borrowingsWithBooks, setBorrowingsWithBooks] = useState([])
  const [reservationsWithBooks, setReservationsWithBooks] = useState([])

  // Refresh dashboard whenever the location changes (navigating back to dashboard)
  useEffect(() => {
    fetchDashboardData()
  }, [location])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError('')
    try {
      // Fetch borrowings directly
      const borrowingsResponse = await borrowingsAPI.getMyBorrowings()
      console.log('My Borrowings Response:', borrowingsResponse)
      const borrowings = borrowingsResponse.borrowings || []

      // Fetch reservations directly
      const reservationsResponse = await reservationsAPI.getMyReservations()
      console.log('My Reservations Response:', reservationsResponse)
      const reservations = reservationsResponse.reservations || []

      setDashboardData({
        borrowings,
        reservations
      })

      // Fetch book details for latest borrowings
      if (borrowings.length > 0) {
        const borrowingsWithBooksData = await Promise.all(
          borrowings.map(async (borrowing) => {
            try {
              const bookData = await booksAPI.getById(borrowing.BookID)
              return {
                ...borrowing,
                bookDetails: bookData
              }
            } catch (err) {
              console.error(`Failed to fetch book ${borrowing.BookID}:`, err)
              return {
                ...borrowing,
                bookDetails: null
              }
            }
          })
        )
        setBorrowingsWithBooks(borrowingsWithBooksData)
      }

      // Fetch book details for latest reservations
      if (reservations.length > 0) {
        const reservationsWithBooksData = await Promise.all(
          reservations.map(async (reservation) => {
            try {
              const bookData = await booksAPI.getById(reservation.BookID)
              return {
                ...reservation,
                bookDetails: bookData
              }
            } catch (err) {
              console.error(`Failed to fetch book ${reservation.BookID}:`, err)
              return {
                ...reservation,
                bookDetails: null
              }
            }
          })
        )
        setReservationsWithBooks(reservationsWithBooksData)
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const calculateDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`
    } else if (diffDays === 0) {
      return 'Due today'
    } else {
      return `${diffDays} days`
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading dashboard...</div>
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
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatusCard 
          title="Number of Borrowings" 
          icon={bookIcon} 
          value={dashboardData?.borrowings?.length || 0} 
        />
        <StatusCard 
          title="Number of Reservations" 
          icon={bookmarkIcon} 
          value={dashboardData?.reservations?.length || 0} 
        />
        <StatusCard 
          title="Number of Returns" 
          icon={returnIcon} 
          value={dashboardData?.borrowings?.filter(b => b.ReturnDate)?.length || 0} 
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 mt-8">Latest Borrowings</h1>
      {borrowingsWithBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowingsWithBooks.slice(0, 3).map((borrowing) => {
            const book = borrowing.bookDetails
            return (
              <UserBooksCard 
                key={borrowing.BorrowID}
                bookId={borrowing.BookID}
                title={book?.Title || 'Loading...'}
                author={book?.Author || ''}
                genre={book?.Category || ''}
                date={book?.Pub_Year || ''}
                due={borrowing.ReturnDate ? 'Returned' : calculateDaysUntilDue(borrowing.DueDate)}
                BookCover={book?.Cover}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No borrowings yet. Start browsing books!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 mt-8">Latest Reservations</h1>
      {reservationsWithBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservationsWithBooks.slice(0, 3).map((reservation) => {
            const book = reservation.bookDetails
            return (
              <UserBooksCard 
                key={reservation.ReservationID}
                bookId={reservation.BookID}
                title={book?.Title || 'Loading...'}
                author={book?.Author || ''}
                genre={book?.Category || ''}
                date={book?.Pub_Year || ''}
                BookCover={book?.Cover}
                reservationDate={new Date(reservation.ReservationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No reservations yet. Reserve your favorite books!
        </div>
      )}
    </div>
  );
}

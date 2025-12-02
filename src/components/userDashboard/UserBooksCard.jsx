import { useNavigate } from 'react-router-dom'

export default function UserBooksCard({bookId, title, author, genre, date, due, reservationDate}) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (bookId) {
            navigate(`/books/${bookId}`)
        }
    }

    return (
        <div 
            className="bg-white flex justify-start shadow-md rounded-lg p-6 gap-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleClick}
        >
            <div className="book-image w-35 h-45 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Book Image</span>     
            </div>
            <div className="book-details flex flex-col items-start mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">Author: {author}</p>
                <p className="text-gray-600 mt-1">Genre: {genre}</p>
                <p className="text-gray-600 mt-1">Published: {date}</p>
                {due && <p className="text-red-700 mt-1">Due in: {due}</p>}
                {reservationDate && <p className="text-cyan-600 mt-1">Reservation Date: <br></br>{reservationDate}</p>}
            </div>
        </div>
    )
}
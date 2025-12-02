import { useNavigate } from 'react-router-dom'

export default function UserBooksCard({bookId, title, author, genre, date, due, reservationDate, BookCover }) {
    const navigate = useNavigate()
    
    const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

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
                    <img 
                        src={BookCover || defaultImage} 
                        alt={title}
                        onError={(e) => {
                            if (e.target.src !== defaultImage) {
                                e.target.src = defaultImage
                            }
                        }}
                    />    
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
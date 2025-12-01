import { useNavigate } from 'react-router-dom'

export default function BooksCard({
  id,
  title,
  author,
  genre,
  date,
  coverImage,
  rating,
  status,
  price
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/books/${id}`)
  }

  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBDb3ZlcjwvdGV4dD48L3N2Zz4='

  return (
    <div 
      onClick={handleClick}
      className="bg-white flex-col justify-start shadow-md rounded-xl gap-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={coverImage || defaultImage}
        alt={title || 'Book cover'}
        className="w-full h-60 object-cover rounded-t-lg shadow-sm"
        onError={(e) => {
          if (e.target.src !== defaultImage) {
            e.target.src = defaultImage
          }
        }}
      />
      <div className="flex flex-col justify-between p-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title || 'Untitled'}</h2>
          <p className="text-gray-600 mt-2">Author: {author || 'Unknown'}</p>
          <p className="text-gray-600 mt-1">Genre: {genre || 'Unknown'}</p>
          <p className="text-gray-600 mt-1">Published: {date || 'Unknown'}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          {status === "Available" ? (
            <span className="text-green-600 font-semibold">Available</span>
          ) : (
            <span className="text-red-600 font-semibold">Unavailable</span>
          )}
          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold">⭐</span>
            <p className="text-gray-600 ml-1">{rating || 'N/A'}/ 5.0</p>
          </div>
        </div>
        <div>
          <p className="text-gray-800 mt-1 font-bold text-lg"><span className="font-semibold">Price:</span>{price || 'N/A'} <span className="font-bold text-green-700">$</span></p>
        </div>
      </div>
    </div>
  );
}

export default function BooksCard({
  title,
  author,
  genre,
  date,
  coverImage,
  rating,
  status,
}) {
  return (
    <div className="bg-white flex-col justify-start shadow-md rounded-xl gap-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-60 object-cover rounded-t-lg shadow-sm"
      />
      <div className="flex flex-col justify-between p-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">Author: {author}</p>
          <p className="text-gray-600 mt-1">Genre: {genre}</p>
          <p className="text-gray-600 mt-1">Published: {date}</p>
        </div>
        <div className="flex items-center justify-between">
          {status === "Available" ? (
            <span className="text-green-600 font-semibold">Available</span>
          ) : (
            <span className="text-red-600 font-semibold">Unavailable</span>
          )}
          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold">⭐</span>
            <p className="text-gray-600 mt-1">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

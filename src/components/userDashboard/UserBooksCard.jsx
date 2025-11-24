export default function UserBooksCard() {
    return (
        <div className="bg-white flex justify-start shadow-md rounded-lg p-6 gap-4">
            <div className="book-image w-35 h-40 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Book Image</span>     
            </div>
            <div className="book-details flex flex-col items-start mt-4">
                <h2 className="text-xl font-semibold text-gray-800">Book Title</h2>
                <p className="text-gray-600 mt-2">Author: John Doe</p>
                <p className="text-gray-600 mt-1">Genre: Fiction</p>
                <p className="text-gray-600 mt-1">Published: 2020</p>
                <p className="text-red-600 mt-1">Due in 3 days</p>
            </div>
        </div>
    )
}
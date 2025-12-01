import { Search } from "lucide-react"
import { useState } from "react"

function Filter({ onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")

  const genres = [
    { value: "all", label: "All Genres" },
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
    { value: "sci-fi", label: "Sci-Fi" },
    { value: "fantasy", label: "Fantasy" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "thriller", label: "Thriller" },
  ]

  const availabilityOptions = [
    { value: "all", label: "All" },
    { value: "available", label: "Available" },
    { value: "borrowed", label: "Borrowed" },
  ]

  const handleApplyFilters = () => {
    const filters = {
      q: searchQuery,
    }
    
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilters()
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Search Input */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-black mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, author, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 text-black placeholder-gray-400 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Genre Select */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-black mb-2">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-100 text-black rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none cursor-pointer"
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Select */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-black mb-2">
            Availability
          </label>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-100 text-black rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none cursor-pointer"
          >
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="md:col-span-1">
          <button
            onClick={handleApplyFilters}
            className="w-full px-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter

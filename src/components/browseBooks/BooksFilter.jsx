import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'

function BooksFilter({ onFilterChange, categories = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const filters = {
      search: searchTerm,
      category: selectedCategory,
      minPrice: minPrice,
      maxPrice: maxPrice
    }
    onFilterChange(filters)
  }, [searchTerm, selectedCategory, minPrice, maxPrice, onFilterChange])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
  }

  const hasActiveFilters = searchTerm || selectedCategory || minPrice || maxPrice

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Books
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by book title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="md:w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price
          </label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min="0"
          />
        </div>

        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price
          </label>
          <input
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min="0"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <X size={18} />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              Search: {searchTerm}
            </span>
          )}
          {selectedCategory && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              Category: {selectedCategory}
            </span>
          )}
          {(minPrice || maxPrice) && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              Price: ${minPrice || '0'} - ${maxPrice || '∞'}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default BooksFilter
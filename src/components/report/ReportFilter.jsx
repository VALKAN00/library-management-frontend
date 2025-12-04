import { Search } from "lucide-react"

function ReportFilter({ reportType, setReportType, onGenerate}) {
  const reportTypes = [
    { value: "popular-books", label: "Popular Books" },
    { value: "all-borrowings", label: "All Borrowings" },
    { value: "all-reservations", label: "All Reservations" },
    { value: "member-activity", label: "Member Activity" }
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
      <div className="grid grid-cols-1 md:grid-cols-[8fr_2fr] gap-4 items-end">
        {/* Report Type */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={onGenerate}
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm md:text-base w-full md:w-auto"
          >
            <Search size={18} className="md:w-5 md:h-5" />
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportFilter

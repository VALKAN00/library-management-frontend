import { Search, Download } from "lucide-react"

function ReportFilter({ reportType, setReportType, onGenerate, onExport }) {
  const reportTypes = [
    { value: "popular-books", label: "Popular Books" },
    { value: "all-borrowings", label: "All Borrowings" },
    { value: "all-reservations", label: "All Reservations" },
    { value: "overdue-books", label: "Overdue Books" },
    { value: "member-activity", label: "Member Activity" }
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Report Type */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>


        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onGenerate}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Search size={20} />
            Generate
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Download size={20} />
            Export
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportFilter

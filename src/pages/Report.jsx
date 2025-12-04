import { useState, useEffect } from "react"
import { reportAPI } from "../api/ReportApi"
import ReportFilter from "../components/Report/ReportFilter.jsx"
import PopularBooksReport from "../components/Report/PopularBooksReport"
import AllBorrowingsReport from "../components/Report/AllBorrowingsReport"
import AllReservationsReport from "../components/Report/AllReservationsReport"
import MemberActivityReport from "../components/Report/MemberActivityReport"

function Report() {
  const [reportType, setReportType] = useState("popular-books")
  const [reportGenerated, setReportGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reportData, setReportData] = useState(null)

  const fetchReportData = async (type) => {
    setLoading(true)
    setError('')
    try {
      let response
      switch (type) {
        case 'popular-books':
          response = await reportAPI.getPopularBooks()
          console.log('Popular books response:', response)
          setReportData(response.popular || [])
          break
        case 'all-borrowings':
          response = await reportAPI.getAllBorrowings()
          console.log('All borrowings response:', response)
          setReportData(response.borrowings || [])
          break
        case 'all-reservations':
          response = await reportAPI.getAllReservations()
          console.log('All reservations response:', response)
          setReportData(response.reservations || [])
          break
        case 'member-activity':
          response = await reportAPI.getMemberActivity()
          console.log('Member activity response:', response)
          setReportData(response.data || [])
          break
        default:
          setReportData([])
      }
      setReportGenerated(true)
    } catch (err) {
      console.error('Error fetching report:', err)
      setError(err.response?.data?.message || 'Failed to fetch report data')
      setReportData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (reportGenerated) {
      fetchReportData(reportType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType])

  const handleGenerate = () => {
    fetchReportData(reportType)
  }

  const handleExport = () => {
    // In real application, export data to CSV or PDF
    console.log(`Exporting ${reportType} report`)
    alert("Report exported successfully!")
  }


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-4 md:py-8">
      <div className="container mx-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-sm md:text-base text-gray-600">Generate and export various library reports</p>
        </div>

        {/* Filter Component */}
        <ReportFilter
          reportType={reportType}
          setReportType={setReportType}
          onGenerate={handleGenerate}
          onExport={handleExport}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
            {error}
          </div>
        )}

        {/* Report Content */}
        {reportGenerated && !loading && !error && reportData && (
          <>
            {reportType === "popular-books" && (
              <PopularBooksReport data={reportData} />
            )}
            {reportType === "all-borrowings" && (
              <AllBorrowingsReport data={reportData} />
            )}
            {reportType === "all-reservations" && (
              <AllReservationsReport data={reportData} />
            )}
            {reportType === "member-activity" && (
              <MemberActivityReport data={reportData} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Report

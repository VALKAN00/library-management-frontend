import { useState } from "react"
import ReportFilter from "../components/Report/ReportFilter"
import PopularBooksReport from "../components/Report/PopularBooksReport"
import AllBorrowingsReport from "../components/Report/AllBorrowingsReport"
import AllReservationsReport from "../components/Report/AllReservationsReport"
import OverdueBooksReport from "../components/Report/OverdueBooksReport"
import MemberActivityReport from "../components/Report/MemberActivityReport"

function Report() {
  const [reportType, setReportType] = useState("popular-books")
  const [dateFrom, setDateFrom] = useState("2025-10-01")
  const [dateTo, setDateTo] = useState("2025-10-31")
  const [reportGenerated, setReportGenerated] = useState(true)

  // Mock data for Popular Books
  const popularBooksData = [
    { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "Fantasy", totalBorrows: 152 },
    { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", totalBorrows: 145 },
    { id: 3, title: "Project Hail Mary", author: "Andy Weir", genre: "Science Fiction", totalBorrows: 128 },
    { id: 4, title: "Dune", author: "Frank Herbert", genre: "Science Fiction", totalBorrows: 119 },
    { id: 5, title: "Klara and the Sun", author: "Kazuo Ishiguro", genre: "Dystopian", totalBorrows: 105 },
    { id: 6, title: "The Four Winds", author: "Kristin Hannah", genre: "Historical Fiction", totalBorrows: 98 }
  ]

  // Mock data for All Borrowings
  const allBorrowingsData = [
    { id: 1, memberName: "John Smith", bookTitle: "The Midnight Library", author: "Matt Haig", borrowDate: "Oct 15, 2025", dueDate: "Nov 15, 2025", status: "active" },
    { id: 2, memberName: "Sarah Johnson", bookTitle: "Atomic Habits", author: "James Clear", borrowDate: "Oct 10, 2025", dueDate: "Nov 10, 2025", status: "active" },
    { id: 3, memberName: "Mike Brown", bookTitle: "Dune", author: "Frank Herbert", borrowDate: "Oct 5, 2025", dueDate: "Nov 5, 2025", status: "overdue" },
    { id: 4, memberName: "Emily Davis", bookTitle: "Project Hail Mary", author: "Andy Weir", borrowDate: "Oct 1, 2025", dueDate: "Nov 1, 2025", status: "returned" },
    { id: 5, memberName: "David Wilson", bookTitle: "The Four Winds", author: "Kristin Hannah", borrowDate: "Sep 25, 2025", dueDate: "Oct 25, 2025", status: "returned" }
  ]

  // Mock data for All Reservations
  const allReservationsData = [
    { id: 1, memberName: "Alice Cooper", bookTitle: "The Midnight Library", author: "Matt Haig", reservationDate: "Oct 20, 2025", expiryDate: "Oct 27, 2025", status: "active" },
    { id: 2, memberName: "Bob Martin", bookTitle: "Atomic Habits", author: "James Clear", reservationDate: "Oct 18, 2025", expiryDate: "Oct 25, 2025", status: "picked-up" },
    { id: 3, memberName: "Carol White", bookTitle: "Dune", author: "Frank Herbert", reservationDate: "Oct 10, 2025", expiryDate: "Oct 17, 2025", status: "expired" },
    { id: 4, memberName: "Daniel Lee", bookTitle: "Project Hail Mary", author: "Andy Weir", reservationDate: "Oct 5, 2025", expiryDate: "Oct 12, 2025", status: "cancelled" }
  ]

  // Mock data for Overdue Books
  const overdueBooksData = [
    { id: 1, memberName: "Mike Brown", bookTitle: "Dune", author: "Frank Herbert", dueDate: "Nov 5, 2025", daysOverdue: 20, fineAmount: 10.00 },
    { id: 2, memberName: "Jennifer Taylor", bookTitle: "The Four Winds", author: "Kristin Hannah", dueDate: "Nov 10, 2025", daysOverdue: 15, fineAmount: 7.50 },
    { id: 3, memberName: "Robert King", bookTitle: "Klara and the Sun", author: "Kazuo Ishiguro", dueDate: "Nov 12, 2025", daysOverdue: 13, fineAmount: 6.50 }
  ]

  // Mock data for Member Activity
  const memberActivityData = [
    { id: 1, name: "John Smith", email: "john.smith@email.com", totalBorrowings: 25, activeBorrowings: 3, totalReservations: 8, overdueBooks: 0 },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", totalBorrowings: 18, activeBorrowings: 2, totalReservations: 5, overdueBooks: 0 },
    { id: 3, name: "Mike Brown", email: "mike.brown@email.com", totalBorrowings: 32, activeBorrowings: 4, totalReservations: 12, overdueBooks: 1 },
    { id: 4, name: "Emily Davis", email: "emily.d@email.com", totalBorrowings: 15, activeBorrowings: 1, totalReservations: 3, overdueBooks: 0 }
  ]

  const handleGenerate = () => {
    setReportGenerated(true)
    // In real application, fetch data based on reportType and date range
    console.log(`Generating ${reportType} report from ${dateFrom} to ${dateTo}`)
  }

  const handleExport = () => {
    // In real application, export data to CSV or PDF
    console.log(`Exporting ${reportType} report`)
    alert("Report exported successfully!")
  }

  const getDateRangeLabel = () => {
    const from = new Date(dateFrom).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const to = new Date(dateTo).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    return from === to ? from : `${from} - ${to}`
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Generate and export various library reports</p>
        </div>

        {/* Filter Component */}
        <ReportFilter
          reportType={reportType}
          setReportType={setReportType}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          onGenerate={handleGenerate}
          onExport={handleExport}
        />

        {/* Report Content */}
        {reportGenerated && (
          <>
            {reportType === "popular-books" && (
              <PopularBooksReport data={popularBooksData} dateRange={getDateRangeLabel()} />
            )}
            {reportType === "all-borrowings" && (
              <AllBorrowingsReport data={allBorrowingsData} dateRange={getDateRangeLabel()} />
            )}
            {reportType === "all-reservations" && (
              <AllReservationsReport data={allReservationsData} dateRange={getDateRangeLabel()} />
            )}
            {reportType === "overdue-books" && (
              <OverdueBooksReport data={overdueBooksData} dateRange={getDateRangeLabel()} />
            )}
            {reportType === "member-activity" && (
              <MemberActivityReport data={memberActivityData} dateRange={getDateRangeLabel()} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Report

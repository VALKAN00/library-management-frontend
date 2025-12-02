import { useState, useEffect } from "react";
import StatusCard from "../components/adminDashboard/StatusCard";
import BorrowingsTable from "../components/adminDashboard/Borrowings";
import PeopleIcon from '@mui/icons-material/People';
import { BookOpenCheck } from "lucide-react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { adminDashboardAPI } from "../api/AdminDashboard";

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null)
    const [borrowings, setBorrowings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        setLoading(true)
        setError('')
        try {
            // Fetch dashboard statistics
            const dashboardResponse = await adminDashboardAPI.getDashboardData()
            setDashboardData(dashboardResponse)

            // Fetch borrowings list
            const borrowingsResponse = await adminDashboardAPI.getAllBorrowings({ page: 1, limit: 20 })
            setBorrowings(borrowingsResponse.borrowings || [])
        } catch (err) {
            console.error("Error fetching admin dashboard data:", err)
            setError(err.response?.data?.message || 'Failed to fetch dashboard data')
        } finally {
            setLoading(false)
        }
    }

    const card = [
        { 
            title: "Total Books", 
            value: dashboardData?.totalBooks || "0", 
            icon: <BookOpenCheck style={{ color: 'blue' }} /> 
        },
        { 
            title: "Active Members", 
            value: dashboardData?.totalUsers || "0", 
            icon: <PeopleIcon style={{ color: 'green' }} /> 
        },
        { 
            title: "Books Borrowed", 
            value: dashboardData?.totalBorrowings || "0", 
            icon: <BookmarkBorderIcon style={{ color: 'orange' }} /> 
        },
        { 
            title: "Overdue Fines", 
            value: "0$", 
            icon: <ErrorOutlineIcon style={{ color: 'red' }} /> 
        },
    ]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        )
    }

    return (
        <div>
            <div className="">
                <h1 className="text-2xl font-bold position-relative">Admin Dashboard</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
                {card.map((item, index) => (
                    <StatusCard key={index} card={item} />
                ))}
            </div>

            <div className="mt-6">
                <BorrowingsTable borrowings={borrowings} onRefresh={fetchDashboardData} />
            </div>
        </div>
    );
}
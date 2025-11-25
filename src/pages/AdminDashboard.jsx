import StatusCard from "../components/adminDashboard/StatusCard";
import ExamScheduleTable from "../components/adminDashboard/Borrowings";
import PeopleIcon from '@mui/icons-material/People';
import { BookOpenCheck } from "lucide-react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export default function AdminDashboard() {
    const card=[
        { title: "Total Books", value: "1500", icon: <BookOpenCheck style={{ color: 'blue' }} /> },
        { title: "Active Members", value: "300", icon: <PeopleIcon style={{ color: 'green' }} /> },
        { title: "Books Borrowed", value: "45", icon: <BookmarkBorderIcon style={{ color: 'orange' }} /> },
        { title: "Overdue Fines", value: "5$", icon: <ErrorOutlineIcon style={{ color: 'red' }} /> },

    ]
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

<div className="mt-6"><ExamScheduleTable /> </div>

        </div>
    );
}
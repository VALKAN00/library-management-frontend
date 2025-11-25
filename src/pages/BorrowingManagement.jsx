
import {Plus } from "lucide-react";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import BorrowingTable from "../components/borrowingManagment/BorrowManagementTable";
export default function BorrowingManagement () {
    return (
        <div className="container mx-auto px-4 ">
            <div className="flex justify-between items-center mb-4">
                <div><h1 className="text-2xl font-bold ">Manage Borrowing</h1>
            <p className="text-gray-600 mb-6">Update, view, and manage all book borrowing.</p></div>
                <div className="flex"><button className="px-4 py-2 bg-blue-600 text-white rounded"><div className="flex gap-2"><div><Plus /></div><div>New Borrowing</div></div></button><div><CircleNotificationsIcon style={{fontSize:"45px",color:"gray"}} /></div> </div>
            </div>
            
            {/* User management content goes here */}
            <div className="mt-6"><BorrowingTable/> </div>
        </div>
    )
}   

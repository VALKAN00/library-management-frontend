import { BookOpenText } from "lucide-react";
import { Bell } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { LibraryBig } from "lucide-react";

function Header() {
  return (
    <div className="navbar flex justify-between items-center px-6 py-3 bg-white border-b border-gray-200">
      <div className="left-section flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <LibraryBig className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800">LibraryHub</span>
      </div>
      <div className="right-section flex justify-between items-center gap-6 " style={{width: "83%"}}>
        <div className="Welcome">
          <h3 className="text-lg font-semibold text-gray-800">Welcome, Alex</h3>
        </div>
        <div className="icons flex items-center gap-4">
          <div className="notification relative w-fit cursor-pointer">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="notification-count text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1 text-[10px] font-semibold">
              2
            </span>
          </div>
          <div className="Avatar cursor-pointer">
            <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}>A</Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

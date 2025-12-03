import { Bell, LogOut } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { LibraryBig } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="navbar flex justify-between items-center px-6 py-3 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="left-section flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <LibraryBig className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800">BitBook</span>
      </div>
      <div className="right-section flex justify-between items-center gap-6 ">
        <div className="Welcome">
          <h3 className="text-lg font-semibold text-gray-800">
            Welcome, {user?.name || user?.username || 'User'}
          </h3>
        </div>
        <div className="icons flex items-center gap-4">
          <div className="relative">
            <div 
              className="Avatar cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}>
                {getInitials(user?.name || user?.username)}
              </Avatar>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || user?.username}
                  </p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

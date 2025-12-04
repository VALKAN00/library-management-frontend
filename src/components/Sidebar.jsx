import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Clock, ChartBar, LogOut, LibraryBig, DollarSign, X } from 'lucide-react'
import PeopleIcon from '@mui/icons-material/People';
import { useAuth } from '../context/AuthContext';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function Sidebar({ isOpen, onClose }) {
  const { logout, user } = useAuth();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const customerMenuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/books', icon: BookOpen, label: 'Browse Books' },
    { path: '/myborrowings', icon: LibraryBig, label: 'My Borrowings' },
    { path: '/reservations', icon: BookOnlineIcon, label: 'My Reservations' },
    { path: '/myfines', icon: DollarSign, label: 'My Fines' },
    { path: '/history', icon: Clock, label: 'History' },
  ];

  const adminMenuItems = [
    { path: '/admindashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { path: '/mangeusers', icon: PeopleIcon, label: 'Manage Users' },
    { path: '/BooksManagement', icon: BookOpen, label: 'Books Management' },
    { path: '/report', icon: ChartBar, label: 'Reports' },
    { path: '/manageborrow', icon: LibraryBig, label: 'Manage Borrowing' },
    { path: '/managereserve', icon: BookOnlineIcon, label: 'Manage Reservations' },
    { path: '/finepayment', icon: DollarSign, label: 'Fines & Payments' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : customerMenuItems;

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-indigo-100 text-indigo-600 font-medium'
        : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`w-64 bg-white flex flex-col border-r border-gray-200 fixed left-0 top-16 bottom-0 z-40 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 pt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={getLinkClass}
              end={item.path === '/'}
              onClick={handleLinkClick}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => {
              logout();
              handleLinkClick();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 w-full transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

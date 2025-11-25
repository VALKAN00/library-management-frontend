import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Clock, Bell, LogOut, LibraryBig } from 'lucide-react'
import PeopleIcon from '@mui/icons-material/People';

function Sidebar() {
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/books', icon: BookOpen, label: 'Browse Books' },
    { path: '/myborrowings', icon: LibraryBig, label: 'My Borrowings' },
    { path: '/reservations', icon: LibraryBig, label: 'My Reservations' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    {path:'/admindashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
    {path:'/mangeusers', icon: PeopleIcon, label: 'Manage Users' },
    {path:'/BooksManagement', icon: LibraryBig, label: 'Books Management' },
    {path:'/borrowingmanagement', icon: LibraryBig, label: 'Borrowings' },
  ]
  
  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-indigo-100 text-indigo-600 font-medium'
        : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-gray-200 fixed left-0 top-16 bottom-0 z-40">
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 pt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={getLinkClass}
            end={item.path === '/'}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 w-full transition-all">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

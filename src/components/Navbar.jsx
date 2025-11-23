import { NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }) => 
    `px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-700 hover:bg-blue-100'
    }`

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600">
            Library System
          </div>
          <div className="flex space-x-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/books" className={navLinkClass}>
              Books
            </NavLink>
            <NavLink to="/members" className={navLinkClass}>
              Members
            </NavLink>
            <NavLink to="/borrowings" className={navLinkClass}>
              Borrowings
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

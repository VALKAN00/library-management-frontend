import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from "./sidebar"

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <main className="ml-64 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

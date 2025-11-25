import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'
import Books from './pages/Books'
import Members from './pages/Members'
import Borrowings from './pages/Borrowings'
import History from './pages/History'
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import SignUPPage from './pages/SignUPPage'
import AdminDashboard from './pages/AdminDashboard'
import ManageUser from './pages/ManageUser'
import './App.css'

function App() {
  return (
    <Routes>
       <Route path="login" element={<LoginPage />} />
       <Route path="signup" element={<SignUPPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="members" element={<Members />} />
        <Route path="borrowings" element={<Borrowings />} />
        <Route path="history" element={<History />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="mangeusers" element={<ManageUser />} />
       
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

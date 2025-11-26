import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import UserDashboard from './pages/UserDashboard'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import Members from './pages/Members'
import History from './pages/UserHistory'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import SignUPPage from './pages/SignUPPage'
import AdminDashboard from './pages/AdminDashboard'
import ManageUser from './pages/ManageUser'
import MyBorrowings from './pages/MyBorrowings'
import MyReservations from './pages/MyResrvations'
import BooksManagement from './pages/BooksMangement'
import Report from './pages/Report'
import ManageBorrow from './pages/ManageBorrow'
import ManageReserve from './pages/ManageReserve'
import FinePayment from './pages/FinePayment'
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
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="members" element={<Members />} />
        <Route path="history" element={<History />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="mangeusers" element={<ManageUser />} />
        <Route path="myborrowings" element={<MyBorrowings />} />
        <Route path="reservations" element={<MyReservations />} />
        <Route path="booksmanagement" element={<BooksManagement />} />
        <Route path="report" element={<Report />} />
        <Route path="manageborrow" element={<ManageBorrow />} />
        <Route path="managereserve" element={<ManageReserve />} />
        <Route path="finepayment" element={<FinePayment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

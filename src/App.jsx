import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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
import ViewAllBorrowings from './components/adminDashboard/ViewAll'
import ManageUser from './pages/ManageUser'
import MyBorrowings from './pages/MyBorrowings'
import MyReservations from './pages/MyResrvations'
import BooksManagement from './pages/BooksMangement'
import Report from './pages/Report'
import ManageBorrow from './pages/ManageBorrow'
import ManageReserve from './pages/ManageReserve'
import FinePayment from './pages/FinePayment'
import MyFines from './pages/MyFines'
import './App.css'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Public Route Component (redirect to home if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="signup" element={
        <PublicRoute>
          <SignUPPage />
        </PublicRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="members" element={<Members />} />
        <Route path="history" element={<History />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/borrowings/all" element={<ViewAllBorrowings />} />
        <Route path="mangeusers" element={<ManageUser />} />
        <Route path="myborrowings" element={<MyBorrowings />} />
        <Route path="reservations" element={<MyReservations />} />
        <Route path="booksmanagement" element={<BooksManagement />} />
        <Route path="report" element={<Report />} />
        <Route path="manageborrow" element={<ManageBorrow />} />
        <Route path="managereserve" element={<ManageReserve />} />
        <Route path="finepayment" element={<FinePayment />} />
        <Route path="myfines" element={<MyFines />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

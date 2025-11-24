import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import Members from './pages/Members'
import Borrowings from './pages/Borrowings'
import History from './pages/History'
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="members" element={<Members />} />
        <Route path="borrowings" element={<Borrowings />} />
        <Route path="history" element={<History />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

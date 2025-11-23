import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8">The page you are looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound

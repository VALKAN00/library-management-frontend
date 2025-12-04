import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminDashboardAPI } from '../../api/AdminDashboard';
import { booksAPI } from '../../api/BooksApi';

export default function ViewAll() {
  const navigate = useNavigate();
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    fetchAllBorrowings();
  }, [page]);

  const fetchAllBorrowings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminDashboardAPI.getAllBorrowings({ page, limit });
      const borrowingsData = response.borrowings || [];
      
      // Fetch book details for each borrowing
      const borrowingsWithBooks = await Promise.all(
        borrowingsData.map(async (borrowing) => {
          try {
            const bookData = await booksAPI.getById(borrowing.BookID);
            return {
              ...borrowing,
              bookTitle: bookData.Title || 'Unknown Book',
            };
          } catch (err) {
            console.error(`Failed to fetch book ${borrowing.BookID}:`, err);
            return {
              ...borrowing,
              bookTitle: 'Unknown Book',
            };
          }
        })
      );

      setBorrowings(borrowingsWithBooks);
      
      // Calculate total pages (assuming API returns total count)
      if (response.total) {
        setTotalPages(Math.ceil(response.total / limit));
      }
    } catch (err) {
      console.error('Error fetching borrowings:', err);
      setError(err.response?.data?.message || 'Failed to fetch borrowings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getStatus = (borrowing) => {
    if (borrowing.ReturnDate || borrowing.Status === 'returned') {
      return 'Returned';
    }
    const today = new Date();
    const dueDate = new Date(borrowing.DueDate);
    if (today > dueDate) {
      return 'Overdue';
    }
    return 'Borrowed';
  };

  const getStatusBadge = (status) => {
    const styles = {
      Returned: 'bg-green-100 text-green-700',
      Borrowed: 'bg-blue-100 text-blue-700',
      Overdue: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Header */}
      <div className="mb-4 md:mb-6 flex items-center gap-2 md:gap-4">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">All Borrowings</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Complete list of all book borrowings</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Borrow Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {borrowings.length > 0 ? (
                    borrowings.map((borrowing) => {
                      const status = getStatus(borrowing);
                      return (
                        <tr key={borrowing.BorrowID} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {borrowing.bookTitle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">User {borrowing.CusID}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(borrowing.BorrowDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(borrowing.DueDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                                status
                              )}`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No borrowings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-3">
              {borrowings.length > 0 ? (
                borrowings.map((borrowing) => {
                  const status = getStatus(borrowing);
                  return (
                    <div key={borrowing.BorrowID} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">
                            {borrowing.bookTitle}
                          </h3>
                          <p className="text-xs text-gray-600">
                            User {borrowing.CusID}
                          </p>
                        </div>
                        <span
                          className={`ml-2 shrink-0 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Borrowed:</span>
                          <div className="font-medium text-gray-900">{formatDate(borrowing.BorrowDate)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Due:</span>
                          <div className="font-medium text-gray-900">{formatDate(borrowing.DueDate)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No borrowings found
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-3 md:px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Page <span className="font-medium">{page}</span> of{' '}
                      <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === pageNum
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <ArrowLeft className="h-5 w-5 rotate-180" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { finesAPI } from '../api/Fines';
import { booksAPI } from '../api/BooksApi';
import { DollarSign, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

export default function MyFines() {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFine, setSelectedFine] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetchMyFines();
  }, []);

  const fetchMyFines = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await finesAPI.getMyFines();
      const finesData = response.fines || [];

      // Fetch book details for each fine
      const finesWithBooks = await Promise.all(
        finesData.map(async (fine) => {
          try {
            const bookData = await booksAPI.getById(fine.BookID);
            return {
              ...fine,
              bookTitle: bookData.Title,
              bookAuthor: bookData.Author,
              bookCover: bookData.Cover,
            };
          } catch (err) {
            console.error(`Failed to fetch book ${fine.BookID}:`, err);
            return {
              ...fine,
              bookTitle: 'Unknown Book',
              bookAuthor: 'Unknown Author',
              bookCover: null,
            };
          }
        })
      );

      setFines(finesWithBooks);
    } catch (err) {
      console.error('Error fetching fines:', err);
      setError(err.response?.data?.message || 'Failed to fetch fines');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePayClick = (fine) => {
    setSelectedFine(fine);
    setPaymentModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    const paymentMethod = document.getElementById('paymentMethod').value;
    setPaymentLoading(true);
    try {
      await finesAPI.payFine(selectedFine.FineID, { paymentMethod });
      setPaymentModalOpen(false);
      setSelectedFine(null);
      // Refresh fines list
      fetchMyFines();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to process payment');
    } finally {
      setPaymentLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <CheckCircle size={16} />
          Paid
        </span>
      );
    } else if (status === 'waived') {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <CheckCircle size={16} />
          Waived
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
          <AlertCircle size={16} />
          Unpaid
        </span>
      );
    }
  };

  const unpaidFines = fines.filter((f) => f.Status === 'unpaid');
  const totalUnpaid = unpaidFines.reduce((sum, fine) => sum + parseFloat(fine.Amount || 0), 0);

  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">My Fines</h1>
        <p className="text-sm md:text-base text-gray-600">View and pay your outstanding fines</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Fines</p>
              <p className="text-2xl font-bold text-gray-900">{fines.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Unpaid Fines</p>
              <p className="text-2xl font-bold text-red-600">{unpaidFines.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Amount Due</p>
              <p className="text-2xl font-bold text-orange-600">${totalUnpaid.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Fines List */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Fine Details</h2>
          </div>

          {fines.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {fines.map((fine) => (
                <div key={fine.FineID} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                    {/* Book Cover */}
                    <div className="shrink-0 self-start">
                      <img
                        src={fine.bookCover || defaultImage}
                        alt={fine.bookTitle}
                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          if (e.target.src !== defaultImage) {
                            e.target.src = defaultImage;
                          }
                        }}
                      />
                    </div>

                    {/* Fine Details */}
                    <div className="grow min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">
                            {fine.bookTitle}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm truncate">by {fine.bookAuthor}</p>
                        </div>
                        {getStatusBadge(fine.Status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Fine Amount</p>
                          <p className="text-xl font-bold text-red-600">
                            ${parseFloat(fine.Amount || 0).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Reason</p>
                          <p className="font-semibold text-gray-900">{fine.Reason || 'N/A'}</p>
                        </div>
                        {fine.DaysOverdue > 0 && (
                          <div>
                            <p className="text-sm text-gray-600">Days Overdue</p>
                            <p className="font-semibold text-gray-900">{fine.DaysOverdue} days</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar size={14} />
                            Issue Date
                          </p>
                          <p className="font-semibold text-gray-900">
                            {formatDate(fine.IssueDate)}
                          </p>
                        </div>
                        {fine.PaidDate && (
                          <div>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar size={14} />
                              Paid Date
                            </p>
                            <p className="font-semibold text-green-600">
                              {formatDate(fine.PaidDate)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {fine.Status === 'unpaid' && (
                        <button
                          onClick={() => handlePayClick(fine)}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <DollarSign size={18} />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <CheckCircle className="mx-auto h-24 w-24 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Fines</h3>
              <p className="text-gray-600">You have no fines at the moment. Keep up the good work!</p>
            </div>
          )}
        </div>
      )}

      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Pay Fine</h2>
            
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Book</p>
                <p className="font-semibold text-gray-900">{selectedFine?.bookTitle}</p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
                <p className="text-3xl font-bold text-red-600">
                  ${parseFloat(selectedFine?.Amount || 0).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                defaultValue="Cash"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Online Transfer">Online Transfer</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPaymentModalOpen(false)}
                disabled={paymentLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={paymentLoading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {paymentLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign size={18} />
                    Confirm Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

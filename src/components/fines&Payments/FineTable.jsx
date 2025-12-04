//FineTable

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PaymentIcon from '@mui/icons-material/Payment';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SearchIcon from '@mui/icons-material/Search';
import { booksAPI } from '../../api/BooksApi';

const columns = [
  { 
    field: 'user', 
    headerName: 'User', 
    flex: 1.2,
    minWidth: 150,
  },
  { 
    field: 'bookTitle', 
    headerName: 'Book Title', 
    flex: 1.5,
    minWidth: 180,
  },
  { 
    field: 'fineAmount', 
    headerName: 'Fine Amount', 
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'reason', 
    headerName: 'Reason', 
    flex: 1.2,
    minWidth: 140,
  },  
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 130,
    renderCell: (params) => (
      <span
        style={{
          color: params.value === 'Paid' ? '#10b981' : '#ef4444',
          backgroundColor: params.value === 'Paid' ? '#d1fae5' : '#fee2e2',
          padding: '6px 14px',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '0.813rem',
          display: 'inline-block',
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1.8,
    minWidth: 220,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const status = params.row.status;
      
      if (status === 'Paid') {
        return <span className="text-gray-500 text-sm">Cleared</span>;
      }

      return (
        <div className="flex gap-2 items-center">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            title="Record Payment"
          >
            <PaymentIcon sx={{ fontSize: 18 }} />
            Record Payment
          </button>
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            title="Waive"
          >
            <MoneyOffIcon sx={{ fontSize: 18 }} />
            Waive
          </button>
        </div>
      );
    },
  }
];

export default function FineTable({ fines = [], loading, error, isAdmin, onPayFine, onWaiveFine }) {
  const [rowsWithBooks, setRowsWithBooks] = useState([])
  const [loadingBooks, setLoadingBooks] = useState(true)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [waiveModalOpen, setWaiveModalOpen] = useState(false)
  const [selectedFine, setSelectedFine] = useState(null)

  useEffect(() => {
    fetchBooksDetails()
  }, [fines])

  const fetchBooksDetails = async () => {
    setLoadingBooks(true)
    try {
      const rowsWithBooksData = await Promise.all(
        fines.map(async (fine) => {
          try {
            const bookData = await booksAPI.getById(fine.BookID)
            return {
              id: fine.FineID,
              user: `User ${fine.UserID}`,
              bookTitle: bookData.Title || 'Unknown Book',
              fineAmount: `$${parseFloat(fine.Amount || 0).toFixed(2)}`,
              reason: fine.Reason || 'N/A',
              daysOverdue: fine.DaysOverdue || 0,
              status: fine.Status === 'paid' ? 'Paid' : fine.Status === 'waived' ? 'Waived' : 'Outstanding',
              rawFine: fine
            }
          } catch (err) {
            console.error(`Failed to fetch book ${fine.BookID}:`, err)
            return {
              id: fine.FineID,
              user: `User ${fine.UserID}`,
              bookTitle: 'Unknown Book',
              fineAmount: `$${parseFloat(fine.Amount || 0).toFixed(2)}`,
              reason: fine.Reason || 'N/A',
              daysOverdue: fine.DaysOverdue || 0,
              status: fine.Status === 'paid' ? 'Paid' : fine.Status === 'waived' ? 'Waived' : 'Outstanding',
              rawFine: fine
            }
          }
        })
      )
      setRowsWithBooks(rowsWithBooksData)
    } catch (err) {
      console.error("Error fetching books details:", err)
    } finally {
      setLoadingBooks(false)
    }
  }

  const handlePayClick = (fine) => {
    setSelectedFine(fine.rawFine)
    setPaymentModalOpen(true)
  }

  const handleWaiveClick = (fine) => {
    setSelectedFine(fine.rawFine)
    setWaiveModalOpen(true)
  }

  const handleConfirmPayment = async (paymentMethod) => {
    try {
      await onPayFine(selectedFine.FineID, paymentMethod)
      setPaymentModalOpen(false)
      setSelectedFine(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to process payment')
    }
  }

  const handleConfirmWaive = async (reason) => {
    try {
      await onWaiveFine(selectedFine.FineID, reason)
      setWaiveModalOpen(false)
      setSelectedFine(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to waive fine')
    }
  }

  const columnsWithActions = [
    ...columns.filter(col => col.field !== 'actions'),
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.8,
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const status = params.row.status;
        
        if (status === 'Paid' || status === 'Waived') {
          return <span className="text-gray-500 text-sm">
            {status === 'Paid' ? 'Cleared' : 'Waived'}
          </span>;
        }

        return (
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => handlePayClick(params.row)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              title="Record Payment"
            >
              <PaymentIcon sx={{ fontSize: 18 }} />
              Pay
            </button>
            {isAdmin && (
              <button 
                onClick={() => handleWaiveClick(params.row)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                title="Waive"
              >
                <MoneyOffIcon sx={{ fontSize: 18 }} />
                Waive
              </button>
            )}
          </div>
        );
      },
    }
  ];

  if (loading || loadingBooks) {
    return (
      <Box className="bg-white p-6 rounded-lg shadow w-full">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
        </div>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="bg-white p-6 rounded-lg shadow w-full">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </Box>
    )
  }

  return (
    <>
      {/* Search Bar */}
      <div className='p-4 md:p-6 pb-4 bg-white rounded-t-lg'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4'>
          <h1 className='text-lg md:text-xl font-semibold text-gray-800'>All Fines</h1>
          <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-auto'>
            <SearchIcon sx={{ color: '#9ca3af', fontSize: { xs: 18, md: 20 } }} />
            <input 
              type="text" 
              placeholder="Search fines..." 
              className='bg-transparent border-none outline-none ml-2 text-xs md:text-sm w-full'
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <Box 
        className="hidden lg:block bg-white rounded-b-lg shadow w-full" 
        sx={{ 
          height: { xs: 500, sm: 450, md: 580 },
          width: '100%',
          overflow: 'auto'
        }}
      >
      <DataGrid
        rows={rowsWithBooks}
        columns={columnsWithActions}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowHeight={() => 'auto'}
        sx={{ 
          textAlign: 'left',
          border: 'none',
          minWidth: { xs: '800px', sm: '100%' },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e5e7eb',
            fontSize: { xs: '0.813rem', sm: '0.875rem', md: '0.9rem' },
            padding: '18px 16px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '1.5',
            color: '#374151',
          },
          '& .MuiDataGrid-row': {
            minHeight: '80px !important',
            maxHeight: 'none !important',
            '&:hover': {
              backgroundColor: '#f9fafb',
            },
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            fontSize: { xs: '0.75rem', sm: '0.813rem', md: '0.875rem' },
            minHeight: '56px !important',
            maxHeight: '56px !important',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f9fafb',
            color: '#6b7280',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            color: '#6b7280',
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      </Box>

      {/* Mobile Cards */}
      <div className="lg:hidden bg-white rounded-b-lg shadow p-4 space-y-3">
        {rowsWithBooks.length > 0 ? (
          rowsWithBooks.map((row) => (
            <div key={row.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {row.bookTitle}
                  </h3>
                  <p className="text-xs text-gray-600">{row.user}</p>
                </div>
                <span
                  style={{
                    color: row.status === 'Paid' ? '#10b981' : '#ef4444',
                    backgroundColor: row.status === 'Paid' ? '#d1fae5' : '#fee2e2',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    display: 'inline-block',
                    minWidth: '70px',
                    textAlign: 'center',
                  }}
                  className="ml-2 shrink-0"
                >
                  {row.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <div className="font-bold text-gray-900 text-base">{row.fineAmount}</div>
                </div>
                <div>
                  <span className="text-gray-500">Days Overdue:</span>
                  <div className="font-medium text-gray-900">{row.daysOverdue}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Reason:</span>
                  <div className="font-medium text-gray-900">{row.reason}</div>
                </div>
              </div>

              {/* Actions */}
              {row.status !== 'Paid' && row.status !== 'Waived' ? (
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => handlePayClick(row)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <PaymentIcon sx={{ fontSize: 18 }} />
                    <span>Pay</span>
                  </button>
                  {isAdmin && (
                    <button 
                      onClick={() => handleWaiveClick(row)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                    >
                      <MoneyOffIcon sx={{ fontSize: 18 }} />
                      <span>Waive</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-200 text-center text-gray-400 text-sm">
                  {row.status === 'Paid' ? 'Cleared' : 'Waived'}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No fines found
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Record Payment</h2>
            <p className="text-gray-600 mb-4">
              Fine Amount: <span className="font-semibold">${parseFloat(selectedFine?.Amount || 0).toFixed(2)}</span>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue="Cash"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Online Transfer">Online Transfer</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const paymentMethod = document.getElementById('paymentMethod').value;
                  handleConfirmPayment(paymentMethod);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waive Modal */}
      {waiveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Waive Fine</h2>
            <p className="text-gray-600 mb-4">
              Fine Amount: <span className="font-semibold">${parseFloat(selectedFine?.Amount || 0).toFixed(2)}</span>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason (Optional)
              </label>
              <textarea
                id="waiveReason"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter reason for waiving fine..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setWaiveModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const reason = document.getElementById('waiveReason').value;
                  handleConfirmWaive(reason);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Confirm Waive
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';

export default function BorrowTable({ borrowings, onReturn, onRenew, loading }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Determine status based on dates
  const getStatus = (borrow) => {
    if (borrow.ReturnDate) return 'Returned';
    
    const now = new Date();
    const dueDate = new Date(borrow.DueDate);
    
    if (now > dueDate) return 'Overdue';
    return 'Borrowed';
  };

  const columns = [
    { 
      field: 'BookTitle', 
      headerName: 'Book Title', 
      flex: 2,
      minWidth: 180,
    },
    { 
      field: 'CustomerName', 
      headerName: 'Customer Name', 
      flex: 2,
      minWidth: 180,
    },
    { 
      field: 'BorrowDate', 
      headerName: 'Borrow Date', 
      flex: 1.2,
      minWidth: 130,
      renderCell: (params) => formatDate(params.value),
    },
    { 
      field: 'DueDate', 
      headerName: 'Due Date', 
      flex: 1.2,
      minWidth: 130,
      renderCell: (params) => formatDate(params.value),
    },
    { 
      field: 'ReturnDate', 
      headerName: 'Return Date', 
      flex: 1.2,
      minWidth: 130,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      minWidth: 110,
      renderCell: (params) => {
        const status = params.value;
        return (
          <span
            style={{
              color: '#ffffff',
              backgroundColor:
                status === 'borrowed' || status === 'Borrowed' ? '#3b82f6' :
                status === 'returned' || status === 'Returned' ? '#059669' :
                status === 'overdue' || status === 'Overdue' ? '#dc2626' :
                '#6b7280',
              padding: '6px 14px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.813rem',
              display: 'inline-block',
              textAlign: 'center',
              minWidth: '85px',
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.2,
      minWidth: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const row = params.row;
        const status = row.Status;

        // If already returned, no actions available
        if (status === 'Returned' || status === 'returned') {
          return <span className="text-gray-400 text-sm">No actions</span>;
        }

        return (
          <div className="flex gap-2 items-center">
            <button 
              className="text-green-600 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-green-50" 
              title="Mark as Returned"
              onClick={() => onReturn(row.BorrowID)}
              disabled={loading}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
            </button>
            <button 
              className="text-blue-600 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-blue-50" 
              title="Renew"
              onClick={() => onRenew(row.BorrowID)}
              disabled={loading}
            >
              <ChangeCircleIcon sx={{ fontSize: 24 }} />
            </button>
          </div>
        );
      },
    }
  ];

  // Filter borrowings based on search term
  const filteredBorrowings = borrowings.filter(borrow => {
    const searchLower = searchTerm.toLowerCase();
    return (
      borrow.BookTitle?.toLowerCase().includes(searchLower) ||
      borrow.CustomerName?.toLowerCase().includes(searchLower) ||
      borrow.BookID?.toString().includes(searchLower) ||
      borrow.CusID?.toString().includes(searchLower) ||
      borrow.Status?.toLowerCase().includes(searchLower)
    );
  });

  // Transform borrowings data for DataGrid
  const rows = filteredBorrowings.map(borrow => ({
    id: borrow.BorrowID,
    BorrowID: borrow.BorrowID,
    BookID: borrow.BookID,
    CusID: borrow.CusID,
    BookTitle: borrow.BookTitle || `Book #${borrow.BookID}`,
    CustomerName: borrow.CustomerName || `Customer #${borrow.CusID}`,
    BorrowDate: borrow.BorrowDate,
    DueDate: borrow.DueDate,
    ReturnDate: borrow.ReturnDate,
    Status: borrow.Status || getStatus(borrow),
  }));

  return (
    <>
      {/* Search Bar */}
      <div className='p-4 md:p-6 pb-4 bg-white rounded-t-lg'>
        <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full md:max-w-md'>
          <SearchIcon sx={{ color: '#9ca3af', fontSize: { xs: 18, md: 20 } }} />
          <input 
            type="text" 
            placeholder="Search by Book Title, Customer Name, or Status..." 
            className='bg-transparent border-none outline-none ml-2 text-xs md:text-sm w-full text-gray-700'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <Box 
        className="hidden lg:block bg-white rounded-b-lg shadow w-full" 
        sx={{ 
          height: { xs: 550, sm: 500, md: 550 },
          width: '100%',
          overflow: 'auto'
        }}
      >
        <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
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
          minWidth: { xs: '900px', sm: '100%' },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e5e7eb',
            fontSize: { xs: '0.813rem', sm: '0.875rem', md: '0.9rem' },
            padding: '16px 16px',
            display: 'flex',
            alignItems: 'center',
            color: '#374151',
          },
          '& .MuiDataGrid-row': {
            minHeight: '72px !important',
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
            backgroundColor: '#6b7885ff',
            color: '#e3e8f3ff',
            fontWeight: '600',
            padding: '16px',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            color: '#6b7280',
          },
          '& .MuiDataGrid-virtualScroller': {
            marginTop: '0 !important',
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
      </Box>

      {/* Mobile Cards */}
      <div className="lg:hidden bg-white rounded-b-lg shadow p-4 space-y-3">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : rows.length > 0 ? (
          rows.map((row) => (
            <div key={row.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {row.BookTitle}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {row.CustomerName}
                  </p>
                </div>
                <span
                  className="ml-2 shrink-0"
                  style={{
                    color: '#ffffff',
                    backgroundColor:
                      row.Status === 'borrowed' || row.Status === 'Borrowed' ? '#3b82f6' :
                      row.Status === 'returned' || row.Status === 'Returned' ? '#059669' :
                      row.Status === 'overdue' || row.Status === 'Overdue' ? '#dc2626' :
                      '#6b7280',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    display: 'inline-block',
                    textAlign: 'center',
                    minWidth: '75px',
                  }}
                >
                  {row.Status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-gray-500">Borrowed:</span>
                  <div className="font-medium text-gray-900">{formatDate(row.BorrowDate)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Due:</span>
                  <div className="font-medium text-gray-900">{formatDate(row.DueDate)}</div>
                </div>
                {row.ReturnDate && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Returned:</span>
                    <div className="font-medium text-gray-900">{formatDate(row.ReturnDate)}</div>
                  </div>
                )}
              </div>

              {/* Actions */}
              {row.Status !== 'Returned' && row.Status !== 'returned' && (
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button 
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                    onClick={() => onReturn(row.BorrowID)}
                    disabled={loading}
                  >
                    <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                    <span>Return</span>
                  </button>
                  <button 
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    onClick={() => onRenew(row.BorrowID)}
                    disabled={loading}
                  >
                    <ChangeCircleIcon sx={{ fontSize: 18 }} />
                    <span>Renew</span>
                  </button>
                </div>
              )}
              {(row.Status === 'Returned' || row.Status === 'returned') && (
                <div className="pt-3 border-t border-gray-200 text-center text-gray-400 text-sm">
                  No actions available
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No borrowings found
          </div>
        )}
      </div>
    </>
  );
}
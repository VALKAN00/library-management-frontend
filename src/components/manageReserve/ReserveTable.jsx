import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';

export default function ReserveTable({ reservations, onPickup, onCancel, loading }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const columns = [
    { 
      field: 'BookTitle', 
      headerName: 'Book Title', 
      flex: 1.5,
      minWidth: 180,
    },
    { 
      field: 'CustomerName', 
      headerName: 'Customer Name', 
      flex: 1.3,
      minWidth: 140,
    },
    { 
      field: 'ReservationDate', 
      headerName: 'Reservation Date', 
      flex: 1.2,
      minWidth: 130,
      renderCell: (params) => formatDate(params.value),
    },
    { 
      field: 'ReservationExpiryDate', 
      headerName: 'Expiry Date', 
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
                status === 'reserved' || status === 'Reserved' ? '#2563eb' :
                status === 'picked_up' || status === 'Picked Up' ? '#059669' :
                status === 'cancelled' || status === 'Cancelled' ? '#dc2626' :
                status === 'expired' || status === 'Expired' ? '#ea580c' :
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
        const status = row.Status?.toLowerCase();

        // If cancelled, picked up, or expired - no actions
        if (status === 'cancelled' || status === 'picked_up' || status === 'picked up' || status === 'expired') {
          return <span className="text-gray-400 text-sm">No actions</span>;
        }

        return (
          <div className="flex gap-2 items-center">
            <button 
              className="text-green-600 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-green-50" 
              title="Mark as Picked Up"
              onClick={() => onPickup(row.ReservationID)}
              disabled={loading}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
            </button>
            <button 
              className="text-red-600 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50" 
              title="Cancel Reservation"
              onClick={() => onCancel(row.ReservationID)}
              disabled={loading}
            >
              <CancelIcon sx={{ fontSize: 24 }} />
            </button>
          </div>
        );
      },
    }
  ];

  // Filter reservations based on search term
  const filteredReservations = reservations.filter(reservation => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reservation.BookTitle?.toLowerCase().includes(searchLower) ||
      reservation.CustomerName?.toLowerCase().includes(searchLower) ||
      reservation.BookID?.toString().includes(searchLower) ||
      reservation.CusID?.toString().includes(searchLower) ||
      reservation.Status?.toLowerCase().includes(searchLower)
    );
  });

  // Transform reservations data for DataGrid
  const rows = filteredReservations.map(reservation => ({
    id: reservation.ReservationID,
    ReservationID: reservation.ReservationID,
    BookID: reservation.BookID,
    CusID: reservation.CusID,
    BookTitle: reservation.BookTitle || `Book #${reservation.BookID}`,
    CustomerName: reservation.CustomerName || `Customer #${reservation.CusID}`,
    ReservationDate: reservation.ReservationDate,
    ReservationExpiryDate: reservation.ReservationExpiryDate,
    Status: reservation.Status || 'Reserved',
  }));
  return (
    <Box 
      className="bg-white rounded-lg shadow w-full" 
      sx={{ 
        height: { xs: 550, sm: 500, md: 550 },
        width: '100%',
        overflow: 'auto'
      }}
    >
      <div className='p-6 pb-4'>
        <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 max-w-md'>
          <SearchIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
          <input 
            type="text" 
            placeholder="Search by Book Title, Customer Name, or Status..." 
            className='bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
       
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
            backgroundColor: '#258aefff',
            color: '#e7eaf0ff',
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
  );
}


//ReserveTable
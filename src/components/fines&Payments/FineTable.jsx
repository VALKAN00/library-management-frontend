//FineTable

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PaymentIcon from '@mui/icons-material/Payment';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SearchIcon from '@mui/icons-material/Search';

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

const rows = [
  {
    id: 1,
    user: "David Green",
    bookTitle: "Project Hail Mary",
    fineAmount: "$12.50",
    reason: "Overdue Return",
    status: "Outstanding",
  },
  {
    id: 2,
    user: "Laura Palmer",
    bookTitle: "The Silent Patient",
    fineAmount: "$5.00",
    reason: "Damaged Book",
    status: "Outstanding",
  },
  {
    id: 3,
    user: "Mark Johnson",
    bookTitle: "Dune",
    fineAmount: "$8.75",
    reason: "Overdue Return",
    status: "Paid",
  },
  {
    id: 4,
    user: "Samantha Ray",
    bookTitle: "The Vanishing Half",
    fineAmount: "$25.00",
    reason: "Lost Book",
    status: "Outstanding",
  },
  {
    id: 5,
    user: "Kevin Hart",
    bookTitle: "Becoming",
    fineAmount: "$3.50",
    reason: "Overdue Return",
    status: "Paid",
  },
];





export default function FineTable() {
  return (
    <Box 
      className="bg-white p-6 rounded-lg shadow w-full" 
      sx={{ 
        height: { xs: 500, sm: 450, md: 580 },
        width: '100%',
        overflow: 'auto'
      }}
    >
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='text-xl font-semibold text-gray-800'>All Fines</h1>
        </div>
        <div className='flex gap-2'>
          <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2'>
            <SearchIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
            <input 
              type="text" 
              placeholder="Search fines..." 
              className='bg-transparent border-none outline-none ml-2 text-sm'
            />
          </div>
        </div>
      </div>
       
      <DataGrid
        rows={rows}
        columns={columns}
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
  );
}

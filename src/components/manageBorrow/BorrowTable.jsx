
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { 
    field: 'bookTitle', 
    headerName: 'Book Title', 
    flex: 1.8,
    minWidth: 180,
  },
  { 
    field: 'borrower', 
    headerName: 'Borrower', 
    flex: 1.3,
    minWidth: 140,
  },
  { 
    field: 'borrowDate', 
    headerName: 'Borrow Date', 
    flex: 1.2,
    minWidth: 130,
  },
  { 
    field: 'dueDate', 
    headerName: 'Due Date', 
    flex: 1.2,
    minWidth: 130,
  },
  { 
    field: 'returnDate', 
    headerName: 'Return Date', 
    flex: 1.2,
    minWidth: 130,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 110,
    renderCell: (params) => (
      <span
        style={{
          color: '#ffffff',
          backgroundColor:
            params.value === 'Borrowed' ? '#3b82f6' :
            params.value === 'Returned' ? '#059669' :
            params.value === 'Overdue' ? '#dc2626' :
            params.value === 'Lost' ? '#d97706' :
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
        {params.value}
      </span>
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1.2,
    minWidth: 140,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const actions = params.row.actions;

      if (actions === "No actions") {
        return <span className="text-gray-400 text-sm">No action...</span>;
      }

      if (!actions) {
        return <span className="text-gray-400 text-sm">-</span>;
      }

      return (
        <div className="flex gap-2 items-center">
          {actions.edit && (
            <button 
              className="text-green-600 hover:text-green-700 transition-colors p-1 rounded-full hover:bg-green-50" 
              title="Mark as Returned"
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
            </button>
          )}
          {actions.refresh && (
            <button 
              className="text-blue-600 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-blue-50" 
              title="Renew"
            >
              <ChangeCircleIcon sx={{ fontSize: 24 }} />
            </button>
          )}
          {actions.delete && (
            <button 
              className="text-red-600 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50" 
              title="Report Issue"
            >
              <ErrorOutlineIcon sx={{ fontSize: 24 }} />
            </button>
          )}
        </div>
      );
    },
  }

];

const rows= [
  {
    id: 1,
    bookTitle: "Atomic Habits",
    borrower: "Emily White",
    borrowDate: "2023-10-28",
    dueDate: "2023-11-18",
    returnDate: "-",
    status: "Borrowed",
    actions: { edit: true, refresh: true, delete: true }
  },
  {
    id: 2,
    bookTitle: "Project Hail Mary",
    borrower: "David Green",
    borrowDate: "2023-10-01",
    dueDate: "2023-10-22",
    returnDate: "-",
    status: "Overdue",
    actions: { edit: true, refresh: true, delete: true }
  },
  {
    id: 3,
    bookTitle: "The Midnight Library",
    borrower: "John Smith",
    borrowDate: "2023-10-15",
    dueDate: "2023-11-05",
    returnDate: "2023-11-02",
    status: "Returned",
    actions: "No actions"
  },
  {
    id: 4,
    bookTitle: "Dune",
    borrower: "Jessica Atreides",
    borrowDate: "2023-09-20",
    dueDate: "2023-10-11",
    returnDate: "-",
    status: "Lost",
    actions: "No actions"
  },
  {
    id: 5,
    bookTitle: "Klara and the Sun",
    borrower: "Sarah Johnson",
    borrowDate: "2023-10-30",
    dueDate: "2023-11-20",
    returnDate: "-",
    status: "Borrowed",
    actions: { edit: true, refresh: true, delete: true }
  },
];



export default function BorrowTable() {
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
            placeholder="Search users..." 
            className='bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700'
          />
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
            backgroundColor: '#f9fafb',
            color: '#6b7280',
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
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { field: 'bookTitle', headerName: 'Book Title', flex: 1.2,
    renderCell: (params) => {
      const book = params.value;
      
      if (typeof book === "string") return <div>{book}</div>;
      
      return (
        <div className="flex flex-col">
          <div className="font-semibold text-gray-900">{book.title}</div>
          <div className="text-gray-500 text-sm">{book.author}</div>
        </div>
      );
    }
  },
   { field: 'user', headerName: 'User', flex: 1,
    renderCell: (params) => {
  const user = params.value;

  if (typeof user === "string") return <div>{user}</div>;

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-gray-900">{user.name}</div>
      <div className="text-gray-500 text-sm">{user.email}</div>
    </div>
  );
}
  },
  { field: 'reserveDate', headerName: 'Reservation Date', flex: 1},
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
        renderCell: (params) => (
        <span
          style={{
           color:
              params.value === 'Pending' ? '#92400e' :
              params.value === 'Approved' ? '#065f46' :
               params.value === 'Cancelled' ? '#991b1b' :
              
              '#374151',
             
            backgroundColor:
              params.value === 'Pending' ? '#fef3c7' :
              params.value === 'Approved' ? '#d1fae5' :
              params.value === 'Cancelled' ? '#fee2e2' :
          
              '#f3f4f6',
                  
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.875rem',
            display: 'inline-block',
          }}
        >
          {params.value}
        </span>    ),},
{
  field: 'actions',
  headerName: 'Actions',
  flex: 0.8,
  sortable: false,
  filterable: false,
  renderCell: (params) => {
    const actions = params.row.actions;

    // Case 1: No actions (string)
    if (actions === "No actions") {
      return <span className="text-gray-400 text-sm"></span>;
    }

    // Case 2: null or undefined → show nothing
    if (!actions) {
      return <span className="text-gray-400 text-sm">-</span>;
    }

    // Case 3: actions object → show buttons
    return (
      <div className="flex gap-3 items-center">
        {actions.approve && (
          <button className="text-green-600 hover:text-green-800 transition-colors" title="Approve">
            <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
          </button>
        )}
        {actions.cancel && (
          <button className="text-red-600 hover:text-red-800 transition-colors" title="Cancel">
            <CancelIcon sx={{ fontSize: 24 }} />
          </button>
        )}
        {actions.convert && (
          <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Convert to Borrowing">
            <SwapHorizIcon sx={{ fontSize: 24 }} />
          </button>
        )}
      </div>
    );
  },
}

];

const rows = [
  {
    id: 1,
    bookTitle: { title: "The Four Winds", author: "Kristin Hannah" },
    user: { name: "Alice Johnson", email: "alice.j@example.com" },
    reserveDate: "2023-11-15",
    status: "Pending",
    actions: { approve: true, cancel: true, convert: true }
  },
  {
    id: 2,
    bookTitle: { title: "Dune", author: "Frank Herbert" },
    user: { name: "Robert Brown", email: "rob.b@example.com" },
    reserveDate: "2023-11-14",
    status: "Approved",
    actions: { cancel: true }
  },
  {
    id: 3,
    bookTitle: { title: "The Vanishing Half", author: "Brit Bennett" },
    user: { name: "Maria Garcia", email: "maria.g@example.com" },
    reserveDate: "2023-11-12",
    status: "Pending",
    actions: { approve: true, cancel: true, convert: true }
  },
  {
    id: 4,
    bookTitle: { title: "Circe", author: "Madeline Miller" },
    user: { name: "James Wilson", email: "james.w@example.com" },
    reserveDate: "2023-11-10",
    status: "Cancelled",
    actions: "No actions"
  },
  {
    id: 5,
    bookTitle: { title: "The Silent Patient", author: "Alex Michaelides" },
    user: { name: "Patricia Martinez", email: "patricia.m@example.com" },
    reserveDate: "2023-11-08",
    status: "Approved",
    actions: { cancel: true }
  },
];





export default function ReserveTable() {
  return (
    <Box 
      className="bg-white p-6 rounded-lg shadow w-full" 
      sx={{ 
        height: { xs: 500, sm: 450, md: 520 },
        width: '100%',
        overflow: 'auto'
      }}
    >
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h1 className='text-xl font-semibold text-gray-800'>Current Reservations (5)</h1>
          </div>
          <div className='flex gap-2'>
            <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2'>
              <SearchIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
              <input 
                type="text" 
                placeholder="Search reservations..." 
                className='bg-transparent border-none outline-none ml-2 text-sm'
              />
            </div>
          </div>
        </div>
       
      <DataGrid
        rows={rows}
        columns={columns }
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
          minWidth: { xs: '600px', sm: '100%' },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f3f4f6',
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' },
            padding: '16px 16px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '1.5',
          },
          '& .MuiDataGrid-row': {
            minHeight: '70px !important',
            maxHeight: 'none !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#fafafa',
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
            minHeight: '56px !important',
            maxHeight: '56px !important',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#fafafa',
            color: '#6b7280',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f9fafb',
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}


//ReserveTable
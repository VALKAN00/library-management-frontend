
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { field: 'bookTitle', headerName: 'Book Title', flex: 1 },
  { field: 'borrower', headerName: 'Borrower', flex: 1.2 },
  { field: 'borrowDate', headerName: 'Borrow Date', flex: 1},
  { field: 'dueDate', headerName: 'Due Date', flex: 1 },
  { field: 'returnDate', headerName: 'Return Date', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
        renderCell: (params) => (
        <span
          style={{
           color:
              params.value === 'Borrowed' ? '#dbeafe' :
              params.value === 'Returned' ? '#d1fae5' :
               params.value === 'Overdue' ? '#fee2e2' :
                params.value === 'Lost' ? '#e2cfbdff' :
              '#f3f4f6',
             
            backgroundColor:
              params.value === 'Borrowed' ? '#1e40af' :
              params.value === 'Returned' ? '#065f46' :
              params.value === 'Overdue' ? '#b75656' :
              params.value === 'Lost' ? '#a67c52' :
              '#374151',
                  
            padding: '4px 12px',
            borderRadius: '6px',
            fontWeight: '500',
            fontSize: '0.875rem',
          }}
        >
          {params.value}
        </span>    ),},
{
  field: 'actions',
  headerName: 'Actions',
  flex: 1,
  sortable: false,
  filterable: false,
  renderCell: (params) => {
    const actions = params.row.actions;

    // Case 1: No actions (string)
    if (actions === "No actions") {
      return <span className="text-gray-400 text-sm">No actions</span>;
    }

    // Case 2: null or undefined → show nothing
    if (!actions) {
      return <span className="text-gray-400 text-sm">-</span>;
    }

    // Case 3: actions object → show buttons
    return (
      <div className="flex gap-2">
        {actions.edit && (
          <button className="text-green-600 hover:text-green-800">
            <CheckCircleOutlineIcon />
          </button>
        )}
        {actions.refresh && (
          <button className="text-blue-600 hover:text-blue-800">
            <ChangeCircleIcon />
          </button>
        )}
        {actions.delete && (
          <button className="text-red-600 hover:text-red-800">
            <ErrorOutlineIcon />
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
      className="bg-white p-4 rounded-lg shadow-lg w-full" 
      sx={{ 
        height: { xs: 500, sm: 450, md: 450 },
        width: '100%',
        overflow: 'auto'
      }}
    >
        <button className='bg-gray-300 my-3 h-10 px-2 rounded'><div className='flex gap-2'><div> <SearchIcon /></div><div><input type="text" placeholder="Search users..." /></div></div></button>
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
        sx={{ 
          
          textAlign: 'left',
          border: 'none',
          minWidth: { xs: '600px', sm: '100%' },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            backgroundColor: '#f8fafc',
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f8fafc',
            color: '#5a6986ff',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
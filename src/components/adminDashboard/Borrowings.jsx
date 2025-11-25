import * as React from 'react';
import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// Initial exam schedule data
const initialRows = [
 
  
   {
    id: 1,
    title: "The Midnight Library",
    member: "John Smith",
    borrowDate: "2023-10-15",
    dueDate: "2023-11-05",
    status: "Returned"
  },
   {
    id: 2,
    title: "Atomic Habits",
    member: "Emily White",
    borrowDate: "2023-10-28",
    dueDate: "2023-11-18",
    status: "Borrowed"
  },
  {
    id: 3,
    title: "Project Hail Mary",
    member: "David Green",
    borrowDate: "2023-10-01",
    dueDate: "2023-10-22",
    status: "Overdue"
  },
   {
    id: 4   ,
    title: "Klara and the Sun",
    member: "Sarah Johnson",
    borrowDate: "2023-10-30",
    dueDate: "2023-11-20",
    status: "Borrowed"
  }


];

export default function BorrowingsTable() {
  // State for managing rows
  const [rows, setRows] = useState(initialRows);

  // Define columns with custom rendering
  const columns = useMemo(() => [
     { field: 'title', headerName: 'Book Title', flex: 1 },
  { field: 'member', headerName: 'Member', flex: 1 },
  { field: 'borrowDate', headerName: 'Borrow Date', flex: 1 },
  { field: 'dueDate', headerName: 'Due Date', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            backgroundColor:
              params.value === 'Borrowed' ? '#dbeafe' :
              params.value === 'Returned' ? '#d1fae5' :
               params.value === 'Overdue' ? '#fee2e2' :
              '#f3f4f6',
             
            color:
              params.value === 'Borrowed' ? '#1e40af' :
              params.value === 'Returned' ? '#065f46' :
              params.value === 'Overdue' ? '#b75656' :
              '#374151',
                  
            padding: '4px 12px',
            borderRadius: '6px',
            fontWeight: '500',
            fontSize: '0.875rem',
          }}
        >
          {params.value}
        </span>
      ),
    },
  ], []);

  // Handle row updates (can be extended for future functionality)
  const processRowUpdate = (newRow) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  // Handle row deletion (optional feature for future use)
  const _handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Handle adding new row (optional feature for future use)
  const _handleAddRow = (newRow) => {
    const id = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { ...newRow, id }]);
  };
  return (
    <Box 
      className="bg-white p-8 rounded-2xl shadow-sm w-full" 
      sx={{ 
        height: 'auto',
        width: '100%',
        overflow: 'visible'
      }}
    >
       <div className='flex justify-between mb-4'> <div className="text-lg font-extrabold mb-4">Recent Borrowings</div><div>
        <button className="text-blue-600 font-bold hover:text-blue-800">View All</button></div></div>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        hideFooter
        autoHeight
        disableColumnMenu
        sx={{ 
          textAlign: 'left',
          border: 'none',
          minWidth: { xs: '600px', sm: '100%' },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
          
            color: '#1f2937',
            fontWeight: '400',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: 'transparent',
            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
            fontWeight: '500',
            color: '#6b7280',
            minHeight: '56px !important',
            maxHeight: '56px !important',
          },
          '& .MuiDataGrid-columnHeader': {
         backgroundColor: '#f8fafc',
            padding: '16px',
            '&:focus': {
              outline: 'none',
            },
            '&:focus-within': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '500',
            color: '#6b7280',
          },
          '& .MuiDataGrid-row': {
            marginBottom: '0px',
            borderBottom: '1px solid #f3f4f6',
            '&:last-child': {
              borderBottom: 'none',
            }
          },
          '& .MuiDataGrid-virtualScroller': {
            marginTop: '0px !important',
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f9fafb',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
import * as React from 'react';
import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { booksAPI } from '../../api/BooksApi';

export default function BorrowingsTable({ borrowings = [] }) {
  const navigate = useNavigate()
  const [rowsWithBooks, setRowsWithBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooksDetails()
  }, [borrowings])

  const fetchBooksDetails = async () => {
    setLoading(true)
    try {
      const rowsWithBooksData = await Promise.all(
        borrowings.map(async (borrowing) => {
          try {
            const bookData = await booksAPI.getById(borrowing.BookID)
            return {
              id: borrowing.BorrowID,
              title: bookData.Title || 'Unknown',
              member: `User ${borrowing.CusID}`,
              borrowDate: formatDate(borrowing.BorrowDate),
              dueDate: formatDate(borrowing.DueDate),
              status: getStatus(borrowing)
            }
          } catch (err) {
            console.error(`Failed to fetch book ${borrowing.BookID}:`, err)
            return {
              id: borrowing.BorrowID,
              title: 'Unknown Book',
              member: `User ${borrowing.CusID}`,
              borrowDate: formatDate(borrowing.BorrowDate),
              dueDate: formatDate(borrowing.DueDate),
              status: getStatus(borrowing)
            }
          }
        })
      )
      setRowsWithBooks(rowsWithBooksData)
    } catch (err) {
      console.error("Error fetching books details:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const getStatus = (borrowing) => {
    if (borrowing.ReturnDate || borrowing.Status === 'returned') {
      return 'Returned'
    }
    const today = new Date()
    const dueDate = new Date(borrowing.DueDate)
    if (today > dueDate) {
      return 'Overdue'
    }
    return 'Borrowed'
  }

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

  return (
    <Box 
      className="bg-white p-8 rounded-2xl shadow-sm w-full" 
      sx={{ 
        height: 'auto',
        width: '100%',
        overflow: 'visible'
      }}
    >
       <div className='flex justify-between mb-4'> 
         <div className="text-lg font-extrabold mb-4">Recent Borrowings</div>
         <div>
           <button 
             onClick={() => navigate('/admin/borrowings/all')}
             className="text-blue-600 font-bold hover:text-blue-800"
           >
             View All
           </button>
         </div>
       </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <DataGrid
          rows={rowsWithBooks}
          columns={columns}
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
      )}
    </Box>
  );
}
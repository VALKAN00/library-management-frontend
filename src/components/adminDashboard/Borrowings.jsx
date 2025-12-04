import * as React from 'react';
import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { booksAPI } from '../../api/BooksApi';
import { membersAPI } from "../../api/MembersApi";

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
           const memberResponse = await membersAPI.getMemberById(borrowing.CusID);
            return {
              id: borrowing.BorrowID,
              title: bookData.Title || 'Unknown',
              member:`${memberResponse.member.UserFirstName} ${memberResponse.member.UserLastName}` ,
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
     { field: 'title', headerName: 'Book Title', flex: 2 },
  { field: 'member', headerName: 'Member', flex: 2  },
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
      className="bg-white p-4 md:p-8 rounded-2xl shadow-sm w-full" 
      sx={{ 
        height: 'auto',
        width: '100%',
        overflow: 'visible'
      }}
    >
       <div className='flex justify-between items-center mb-4'> 
         <div className="text-base md:text-lg font-extrabold">Recent Borrowings</div>
         <div>
           <button 
             onClick={() => navigate('/admin/borrowings/all')}
             className="text-blue-600 text-sm md:text-base font-bold hover:text-blue-800"
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
        <>
        {/* Desktop Table */}
        <div className="hidden lg:block">
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
            color: '#e3e6edff',
            minHeight: '56px !important',
            maxHeight: '56px !important',
          },
          '& .MuiDataGrid-columnHeader': {
         backgroundColor: '#99aabbff',
         color: '#f1f4f8ff',
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
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {rowsWithBooks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No borrowings found
          </div>
        ) : (
          rowsWithBooks.map((row) => (
            <div key={row.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate mb-1">
                    {row.title}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    {row.member}
                  </p>
                </div>
                <span
                  className="ml-2 shrink-0"
                  style={{
                    backgroundColor:
                      row.status === 'Borrowed' ? '#dbeafe' :
                      row.status === 'Returned' ? '#d1fae5' :
                      row.status === 'Overdue' ? '#fee2e2' :
                      '#f3f4f6',
                    color:
                      row.status === 'Borrowed' ? '#1e40af' :
                      row.status === 'Returned' ? '#065f46' :
                      row.status === 'Overdue' ? '#b75656' :
                      '#374151',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    fontSize: '0.75rem',
                  }}
                >
                  {row.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Borrowed:</span>
                  <div className="font-medium text-gray-900">{row.borrowDate}</div>
                </div>
                <div>
                  <span className="text-gray-500">Due:</span>
                  <div className="font-medium text-gray-900">{row.dueDate}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </>
      )}
    </Box>
  );
}
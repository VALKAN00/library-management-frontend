import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {Pencil ,Trash} from 'lucide-react';
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import { membersAPI } from '../../api/MembersApi';
import EditModal from './EditModal';


export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users from API...');
      const response = await membersAPI.getAllMembers(1, 100); // Fetch first 100 users
      console.log('API Response:', response);
      
      // Extract the members array from the response object
      const data = response.members || [];
      console.log('Members array:', data);
      
      // Transform API data to match table format
      const transformedData = data.map((member) => ({
        id: member.UserID,
        originalId: member.UserID, // Keep original ID for API calls
        name: {
          img: <Person2Icon className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0" />,
          name: `${member.UserFirstName} ${member.UserLastName}`
        },
        email: member.UserName, // Using UserName as email/username
        role: member.UserRole || 'Customer',
        status: member.UserStatus || 'Active' // Add status field for search
      }));
      
      console.log('Transformed Data:', transformedData);
      setUsers(transformedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Error details:', error.response || error.message);
      // Fallback to empty array on error
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await membersAPI.deleteMember(id);
        // Refresh the list after deletion
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleEdit = (row) => {
    console.log('Edit user:', row.originalId || row.id);
    setSelectedUserId(row.originalId || row.id);
    setEditModalOpen(true);
  };

  // Define columns with actions
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1.7 ,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {params.value.img ? params.value.img : <Person2Icon style={{ color: 'gray' }} />}
          <span>{params.value.name}</span>
        </div>
      ),
    },
    { field: 'email', headerName: 'User Name', flex: 1.7 },
  
    { field: 'role', headerName: 'Role', flex: 1 },
   
    { field: 'actions', headerName: 'Actions', flex: 1 ,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button 
            className="text-[#3422efff] font-bold hover:text-gray-600"
            onClick={() => handleEdit(params.row)}
          > 
            <Pencil className="inline-block mr-1" />
          </button>
          <button 
            className="text-red-800 font-bold hover:text-gray-600"
            onClick={() => handleDelete(params.row.originalId || params.row.id)}
          >
            <Trash className="inline-block mr-1" />
          </button>
        </div>
      ),  
    },
  ];

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      {/* Search Bar */}
      <div className='bg-gray-300 mb-4 h-10 px-3 rounded flex items-center gap-2'>
        <SearchIcon sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-transparent outline-none flex-1 text-sm md:text-base'
        />
      </div>

      {/* Desktop Table */}
      <Box 
        className="hidden lg:block bg-white p-4 rounded-lg shadow-lg w-full" 
        sx={{ 
          height: { xs: 500, sm: 450, md: 450 },
          width: '100%',
          overflow: 'auto'
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
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
              backgroundColor: '#b2d3f4ff',
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#3422efff',
              color: '#f5f6f7ff',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0">
                  {user.name.img}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {user.name.name}
                  </h3>
                  <p className="text-xs text-gray-600 truncate mt-1">
                    {user.email}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button 
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  onClick={() => handleEdit(user)}
                > 
                  <Pencil size={16} />
                  <span>Edit</span>
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  onClick={() => handleDelete(user.originalId || user.id)}
                >
                  <Trash size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
            No users found
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      <EditModal 
        isOpen={editModalOpen} 
        onClose={() => {
          setEditModalOpen(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
        onUserUpdated={fetchUsers}
      />
    </>
  );
}
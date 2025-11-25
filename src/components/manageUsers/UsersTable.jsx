import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {Pencil ,Trash} from 'lucide-react';
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 ,
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        {params.value.img ? params.value.img : <PeopleIcon style={{ color: 'gray' }} />}
        <span>{params.value.name}</span>
      </div>
    ),
  },
  { field: 'email', headerName: 'Email', flex: 1.2 },
  { field: 'joinDate', headerName: 'Join Date', flex: 1},
  { field: 'role', headerName: 'Role', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <span
        style={{
          backgroundColor:
            params.value === 'Active'  ? '#d9fdd3' :
            params.value === 'Pending' ? '#d3e3fd' :
            params.value === 'Suspended' ? '#fee2e2' :
            '#f3f3f3',
          color: '#222',
          padding: '4px 10px',
          borderRadius: '12px',
          fontWeight: '600',
        }}
      >
        {params.value}
      </span>
    ),
  },
  { field: 'actions', headerName: 'Actions', flex: 1 ,
    renderCell: (params) => (
      <div className="flex gap-2">
        <button className="text-gray-600 font-bold hover:text-blue-800"><Pencil className="inline-block mr-1" /></button>
        <button className="text-gray-600 font-bold hover:text-red-800"><Trash className="inline-block mr-1" /></button>
      </div>
    ),  
  },
];

const rows = [
  {
    id: 1,
    name: {
        img:<Person2Icon style={{ color: 'gray' }} />,
    name:"John Carter"},
    email: "john.carter@example.com",
    role: "Student",
    joinDate: "2024-09-12",
    status: "Active",
  },
  {
    id: 2,
    name: {
        img:<Person2Icon style={{ color: 'gray' }} />,
    name:"Emily Brown"},
    email: "emily.brown@example.com",
    role: "Student",
    joinDate: "2024-09-15",
    status: "Active",
  },
  {
    id: 3,
      name: {
        img:<Person2Icon style={{ color: 'gray' }} />,
    name:"Liam Wilson"},
    email: "liam.wilson@example.com",
    role: "Student",
    joinDate: "2024-09-20",
    status: "Pending",
  },
  {
    id: 4,
      name: {
        img:<Person2Icon style={{ color: 'gray' }} />,
    name:"Sophia Davis"},
    email: "sophia.davis@example.com",
    role: "Student",
    joinDate: "2024-09-25",
    status: "Suspended",
  },
  {
    id: 5,
    name: {
        img:<Person2Icon style={{ color: 'gray' }} />,
    name:"Noah Lee"},
    email: "noah.lee@example.com",
    role: "Student",
    joinDate: "2024-10-01",
    status: "Active",
  },
  {
    id: 6,
   name: {
        img:<Person2Icon style={{ color: 'gray' }} />,
    name:"Ava Martinez"},
    email: "ava.martinez@example.com",
    role: "Student",
    joinDate: "2024-10-05",
    status: "Active",
  },
];



export default function UsersTable() {
  return (
    <Box 
      className="bg-white p-4 rounded-lg shadow-lg w-full" 
      sx={{ 
        height: { xs: 500, sm: 450, md: 450 },
        width: '100%',
        overflow: 'auto'
      }}
    >
        <button className='bg-gray-200 my-3 h-10 px-2 rounded'><div className='flex gap-2'><div> <SearchIcon /></div><div><input type="text" placeholder="Search users..." /></div></div></button>
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
            color: '#50555eff',
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
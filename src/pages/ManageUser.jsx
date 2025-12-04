import UsersTable from "../components/manageUsers/UsersTable";
import {Plus } from "lucide-react";
import { useState } from "react";
import AddModal from "../components/manageUsers/AddModal";
import AddAdminModal from "../components/manageUsers/AddAdminModal";

export default function ManageUser() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

   const openAddAdminModal = () => {
        setIsAddAdminModalOpen(true);
    };
    const closeAddAdminModal = () => {
        setIsAddAdminModalOpen(false);
    }
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };
    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };  
    return (
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 md:gap-0">
                <div><h1 className="text-2xl md:text-4xl font-bold">Manage Users</h1>
            <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-6">Add, edit, and manage user accounts.</p></div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto"><button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded text-sm md:text-base" onClick={openAddModal}><div className="flex gap-2 items-center justify-center"><div><Plus size={18} className="md:w-5 md:h-5" /></div><div className="whitespace-nowrap">Add New User</div></div></button> <button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded text-sm md:text-base" onClick={openAddAdminModal}><div className="flex gap-2 items-center justify-center"><div><Plus size={18} className="md:w-5 md:h-5" /></div><div className="whitespace-nowrap">Add New Admin</div></div></button> </div>
            </div>
            {/* User management content goes here */}
            <div className="mt-6"><UsersTable /> </div>
            <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            <AddAdminModal isOpen={isAddAdminModalOpen} onClose={closeAddAdminModal} />
        </div>
    );
}
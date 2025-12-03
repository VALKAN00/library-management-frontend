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
        <div className="container mx-auto px-4 ">
           <div className="flex justify-between items-center mb-4">
                <div><h1 className="text-2xl font-bold ">Manage Users</h1>
            <p className="text-gray-600 mb-6">Add, edit, and manage user accounts.</p></div>
                <div className="flex"><button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={openAddModal}><div className="flex gap-2"><div><Plus /></div><div> Add New User</div></div></button> <button className="px-4 py-2  mx-4 bg-blue-600 text-white rounded" onClick={openAddAdminModal}><div className="flex gap-2 "><div><Plus /></div><div> Add New Admin</div></div></button> </div>
            </div>
            {/* User management content goes here */}
            <div className="mt-6"><UsersTable /> </div>
            <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            <AddAdminModal isOpen={isAddAdminModalOpen} onClose={closeAddAdminModal} />
        </div>
    );
}
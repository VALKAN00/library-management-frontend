import UsersTable from "../components/manageUsers/UsersTable";
import {Plus } from "lucide-react";

export default function ManageUser() {
    return (
        <div className="container mx-auto px-4 ">
           <div className="flex justify-between items-center mb-4">
                <div><h1 className="text-2xl font-bold ">Manage Users</h1>
            <p className="text-gray-600 mb-6">Add, edit, and manage user accounts.</p></div>
                <div className="flex"><button className="px-4 py-2 bg-blue-600 text-white rounded"><div className="flex gap-2"><div><Plus /></div><div> Add New User</div></div></button> </div>
            </div>
            {/* User management content goes here */}
            <div className="mt-6"><UsersTable /> </div>
        </div>
    );
}
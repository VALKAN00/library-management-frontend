import GradesTable from "../components/manageUsers/UsersTable";
export default function ManageUser() {
    return (
        <div className="container mx-auto px-4 ">
            <h1 className="text-2xl font-bold ">User Management</h1>
            <p className="text-gray-600 mb-6">Add, edit, and manage user accounts.</p>
            {/* User management content goes here */}
            <div className="mt-6"><GradesTable /> </div>
        </div>
    );
}
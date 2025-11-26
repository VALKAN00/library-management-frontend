import ReserveTable from "../components/manageReserve/ReserveTable";
export default function ManageReserve() {
    return (
        <div className="container mx-auto px-4 ">
           <div className="flex justify-between items-center mb-4">
                <div><h1 className="text-2xl font-bold ">Manage Reserve</h1>
            <p className="text-gray-600 mb-6">Review and manage all book reservations requests.</p></div>
              </div>    
            {/* Reserve management content goes here */}
            <div className="mt-6"><ReserveTable /> </div>
        </div>
    );
}
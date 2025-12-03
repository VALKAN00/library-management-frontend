import ReserveTable from "../components/manageReserve/ReserveTable";
import { Plus } from "lucide-react";
export default function ManageReserve() {
    return (
        <div className="container mx-auto px-4 ">
           <div className="flex justify-between items-center mb-4">
                <div className="flex justify-between p-4 rounded-lg w-full">
                    <div>
                        <h1 className="text-2xl font-bold ">Manage Reserve</h1>
            <p className="text-gray-600 mb-6">Review and manage all book reservations requests.</p>
            </div>  
            <div className="flex">
                    <button
                        
                        className="px-4  bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                     
                    >
                        <div className="flex gap-2 items-center">
                            <Plus size={20} />
                            <span>New Reservations</span>
                        </div>
                    </button>
                </div></div>
              </div>    
            {/* Reserve management content goes here */}
            <div className="mt-6"><ReserveTable /> </div>
        </div>
    );
}
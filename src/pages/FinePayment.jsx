import FineTable from '../components/fines&Payments/FineTable.jsx';
export default function FinePayment() {
    return (
       <div className="container mx-auto px-4 ">
           <div className="flex justify-between items-center mb-4">
                <div><h1 className="text-2xl font-bold "> Fines & Payments</h1>
            <p className="text-gray-600 ">manage all outstanding and paid fines.</p></div>
              </div>    
            {/* Fine management content goes here */}
            <div className="mt-6"><FineTable /> </div>
        </div>
    );
}
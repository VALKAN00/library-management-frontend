

export default function StatusCard({ card }) {
    return (
        <div className="status-card p-4 bg-white rounded-lg shadow-md">
           <div className="flex justify-between"> <div> <h2 className="text-gray-600 mb-2">{card.title}</h2> </div> <div className="pr-2 ">{card.icon}</div></div>
            <p className=" text-lg font-semibold">{card.value}</p>
        </div>
    );

}
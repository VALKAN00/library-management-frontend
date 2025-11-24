export default function StatusCard({ title, icon, value }) {
  return (
    <div className="bg-white flex flex-col justify-start items-start shadow-md rounded-lg p-6 gap-4">
      <div className="book-details flex justify-between items-center w-full">
        <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
        <div className="icon-container bg-indigo-100 rounded-lg p-3 flex items-center justify-center mt-2">
          <span className="text-gray-600">{icon}</span>
        </div>
      </div>
      <div className="flex justify-start gap-4 items-center w-full">
        <p className="text-4xl font-bold text-indigo-600 mt-2">{value}</p>
      </div>
    </div>
  );
}

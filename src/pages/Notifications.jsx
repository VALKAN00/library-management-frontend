function Notifications() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-xl">📚</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">No new notifications</h3>
              <p className="text-gray-600 text-sm">You're all caught up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications

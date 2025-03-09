export function RoomSkeleton(){
    return <div className="space-y-3">
    {Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="w-full rounded-lg flex items-center shadow-md bg-black/25 ps-3 py-4  gap-2 animate-pulse"
      >
        <div className="w-10 h-10 bg-gray-700 rounded-md"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      </div>
    ))}
  </div>
}
export function UserSectionSkeleton(){
    return (<div
        className="w-full rounded-xl flex items-center justify-between shadow-md bg-[#ffffff10] px-3 py-5  gap-2 animate-pulse"
      >
        <div className="flex flex-1 gap-2 items-center">
            <div className="w-6 h-6 bg-bg-[#7e7e7e10] rounded-md"></div>
            <div className="h-4 bg-bg-[#7e7e7e10] rounded w-3/4 mb-2"></div>
        </div>
        <div className="w-6 h-6 bg-bg-[#7e7e7e10] rounded-md"></div>
      </div>)
}
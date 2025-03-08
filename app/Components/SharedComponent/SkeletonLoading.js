export const SkeletonLoading = () => {
  return (
    <div className="animate-pulse min-h-[100vh]">
      {/* Header Skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded-md mb-8"></div>

      {/* Tables Skeleton */}
      {[1].map((table) => (
        <div key={table} className="mt-8 h-[10vh]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="h-6 w-40 bg-gray-100 rounded-md mb-2"></div>
            <div className="h-4 w-56 bg-gray-100 rounded-md mb-6"></div>

            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="h-20 bg-gray-100 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

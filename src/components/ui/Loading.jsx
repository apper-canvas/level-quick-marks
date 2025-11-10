import React from "react"

const Loading = ({ className = "" }) => {
  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Search bar skeleton */}
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      
      {/* Tag filter skeleton */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
        ))}
      </div>
      
      {/* Bookmark cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm border animate-pulse">
            <div className="space-y-4">
              {/* Title */}
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              
              {/* URL */}
              <div className="h-4 bg-gray-200 rounded w-full" />
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-6 w-16 bg-gray-200 rounded-full" />
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading
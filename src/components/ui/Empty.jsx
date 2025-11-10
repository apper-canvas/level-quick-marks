import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No bookmarks yet", 
  description = "Start building your collection by adding your first bookmark",
  actionLabel = "Add Bookmark",
  onAction,
  icon = "Bookmark",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 text-center ${className}`}>
      <div className="w-20 h-20 mb-8 text-gray-300">
        <ApperIcon name={icon} size={80} />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium text-lg"
        >
          <ApperIcon name="Plus" size={20} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default Empty
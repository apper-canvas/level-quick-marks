import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const TagPill = ({ 
  tag, 
  onClick, 
  onRemove, 
  isSelected = false, 
  showCount = false, 
  className = "" 
}) => {
  const handleClick = (e) => {
    e.stopPropagation()
    if (onClick) onClick(tag)
  }
  
  const handleRemove = (e) => {
    e.stopPropagation()
    if (onRemove) onRemove(tag)
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 border",
        isSelected
          ? "border-current shadow-md"
          : "border-transparent hover:shadow-sm",
        className
      )}
      style={{
        backgroundColor: isSelected ? tag.color : `${tag.color}20`,
        color: isSelected ? "white" : tag.color
      }}
      onClick={handleClick}
    >
      {isSelected && (
        <ApperIcon name="Check" size={14} />
      )}
      
      <span>{tag.name}</span>
      
      {showCount && tag.count !== undefined && (
        <span className={cn(
"px-1 py-0.5 text-xs rounded-full",
          isSelected ? "bg-white/20" : "bg-current/20"
        )}>
          {tag.count}
        </span>
      )}
      
      {onRemove && (
        <button
          onClick={handleRemove}
          className={cn(
            "p-0.5 rounded-full hover:bg-white/20 transition-colors",
            isSelected ? "text-white" : "text-current"
          )}
        >
          <ApperIcon name="X" size={12} />
        </button>
      )}
    </motion.div>
  )
}

export default TagPill
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import TagPill from "@/components/atoms/TagPill"
import ApperIcon from "@/components/ApperIcon"

const TagFilter = ({ 
  tags = [], 
  selectedTags = [], 
  onTagSelect, 
  onClearFilters,
  className = "" 
}) => {
  const hasActiveFilters = selectedTags.length > 0
  
  return (
<div className={`space-y-2.5 ${className}`}>
      {/* Active filters */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="text-sm font-medium text-gray-600">
              Active filters:
            </span>
            
            {selectedTags.map(tagName => {
              const tag = tags.find(t => t.name === tagName)
              if (!tag) return null
              
              return (
                <TagPill
                  key={tag.Id}
                  tag={tag}
                  isSelected
                  onClick={() => onTagSelect(tag.name)}
                  onRemove={() => onTagSelect(tag.name)}
                />
              )
            })}
            
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1"
            >
              <ApperIcon name="X" size={14} />
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Available tags */}
      {tags.length > 0 && (
        <div>
<div className="flex items-center gap-1.5 mb-2.5">
            <ApperIcon name="Filter" size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Filter by tags:
            </span>
          </div>
          
<div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {tags
              .filter(tag => !selectedTags.includes(tag.name))
              .sort((a, b) => b.count - a.count)
              .map(tag => (
                <TagPill
                  key={tag.Id}
                  tag={tag}
                  onClick={() => onTagSelect(tag.name)}
                  showCount
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TagFilter
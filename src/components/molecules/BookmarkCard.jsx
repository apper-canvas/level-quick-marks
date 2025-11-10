import React, { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/utils/cn"
import TagPill from "@/components/atoms/TagPill"
import ApperIcon from "@/components/ApperIcon"

const BookmarkCard = ({ 
  bookmark, 
  tags = [], 
  onEdit, 
  onDelete,
  className = "" 
}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleOpenUrl = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer")
  }
  
  const handleCopyUrl = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(bookmark.url)
      toast.success("URL copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy URL")
    }
  }
  
  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(bookmark)
  }
  
  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(bookmark)
  }
  
  const getTagData = (tagName) => {
    return tags.find(t => t.name === tagName) || {
      name: tagName,
      color: "#5B7FFF",
      Id: `temp-${tagName}`
    }
  }
  
  const truncateUrl = (url) => {
    try {
      const urlObj = new URL(url)
      const domain = urlObj.hostname.replace("www.", "")
      return domain
    } catch {
      return url.length > 40 ? `${url.substring(0, 40)}...` : url
    }
  }
  
  const timeAgo = formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-white rounded-lg p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 cursor-pointer group",
        isLoading && "opacity-50 pointer-events-none",
        className
      )}
      onClick={handleOpenUrl}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg font-display group-hover:text-primary transition-colors">
            {bookmark.title}
          </h3>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={handleCopyUrl}
              className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy URL"
            >
              <ApperIcon name="Copy" size={16} />
            </button>
            
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit bookmark"
            >
              <ApperIcon name="Edit2" size={16} />
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors"
              title="Delete bookmark"
            >
              <ApperIcon name="Trash2" size={16} />
            </button>
          </div>
        </div>
        
        {/* URL */}
        <div className="flex items-center gap-2 text-sm">
          <ApperIcon name="Link" size={14} className="text-gray-400 flex-shrink-0" />
          <span className="font-mono text-gray-600 truncate">
            {truncateUrl(bookmark.url)}
          </span>
        </div>
        
        {/* Description */}
        {bookmark.description && (
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {bookmark.description}
          </p>
        )}
        
        {/* Tags */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map(tagName => {
              const tagData = getTagData(tagName)
              return (
                <TagPill
                  key={tagData.Id}
                  tag={tagData}
                  className="text-xs"
                />
              )
            })}
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {timeAgo}
          </span>
          
          <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium">Open</span>
            <ApperIcon name="ExternalLink" size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BookmarkCard
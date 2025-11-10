import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BookmarkCard from "@/components/molecules/BookmarkCard"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const BookmarkList = ({ 
  bookmarks = [], 
  tags = [], 
  onEdit, 
  onDelete,
  className = "" 
}) => {
  const [sortBy, setSortBy] = useState("date") // "date" | "title"
  const [sortOrder, setSortOrder] = useState("desc") // "asc" | "desc"
  
  const sortedBookmarks = useMemo(() => {
    const sorted = [...bookmarks].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      } else {
        const titleA = a.title.toLowerCase()
        const titleB = b.title.toLowerCase()
        if (sortOrder === "desc") {
          return titleB.localeCompare(titleA)
        } else {
          return titleA.localeCompare(titleB)
        }
      }
    })
    return sorted
  }, [bookmarks, sortBy, sortOrder])
  
  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortOrder("desc")
    }
  }
  
  const getSortIcon = (field) => {
    if (sortBy !== field) return "ArrowUpDown"
    return sortOrder === "asc" ? "ArrowUp" : "ArrowDown"
  }
  
  if (bookmarks.length === 0) {
    return null // Let parent handle empty state
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Sort Controls */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">
          Sort by:
        </span>
        
        <div className="flex gap-2">
          <Button
            variant={sortBy === "date" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleSort("date")}
            className="text-sm"
          >
            <ApperIcon name={getSortIcon("date")} size={14} />
            Date
          </Button>
          
          <Button
            variant={sortBy === "title" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleSort("title")}
            className="text-sm"
          >
            <ApperIcon name={getSortIcon("title")} size={14} />
            Title
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 ml-auto">
          {bookmarks.length} {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
        </div>
      </div>
      
      {/* Bookmark Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {sortedBookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.Id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <BookmarkCard
                bookmark={bookmark}
                tags={tags}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default BookmarkList
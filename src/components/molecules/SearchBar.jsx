import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search bookmarks...", className = "" }) => {
  const [query, setQuery] = useState("")
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query)
    }, 300)
    
    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])
  
  const handleClear = () => {
    setQuery("")
    onSearch("")
  }
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <ApperIcon name="Search" size={20} />
      </div>
      
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-12 pr-12 h-12 text-base bg-white/80 backdrop-blur-sm border-gray-200 hover:border-primary/50 focus:border-primary shadow-sm"
      />
      
      {query && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <ApperIcon name="X" size={16} />
        </motion.button>
      )}
    </div>
  )
}

export default SearchBar
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const FloatingActionButton = ({ onClick, className = "" }) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.1, 
        rotate: 90,
        boxShadow: "0 10px 30px rgba(91, 127, 255, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg z-40",
        "flex items-center justify-center transition-all duration-200",
        "hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/30",
        className
      )}
      title="Add new bookmark"
    >
      <ApperIcon name="Plus" size={24} />
    </motion.button>
  )
}

export default FloatingActionButton
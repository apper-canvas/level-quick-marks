import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()
  
  const handleGoHome = () => {
    navigate("/")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Large 404 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-8xl font-bold text-primary mb-4 font-display"
        >
          404
        </motion.div>
        
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-20 h-20 mx-auto mb-6 text-gray-300"
        >
          <ApperIcon name="BookmarkX" size={80} />
        </motion.div>
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl font-semibold text-gray-900 mb-3 font-display"
        >
          Page Not Found
        </motion.h1>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-600 mb-8 text-lg"
        >
          The bookmark you're looking for seems to have wandered off. Let's get you back to your collection.
        </motion.p>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <Button
            onClick={handleGoHome}
            size="lg"
            className="w-full"
          >
            <ApperIcon name="Home" size={20} />
            Back to Bookmarks
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            size="lg"
            className="w-full"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            Go Back
          </Button>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">
            Quick actions while you're here:
          </p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGoHome}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ApperIcon name="Search" size={20} />
            </button>
            
            <button
              onClick={handleGoHome}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ApperIcon name="Plus" size={20} />
            </button>
            
            <button
              onClick={handleGoHome}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ApperIcon name="Tag" size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
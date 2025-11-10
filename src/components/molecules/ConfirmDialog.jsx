import React from "react"
import { motion } from "framer-motion"
import Modal from "@/components/atoms/Modal"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false
}) => {
  const handleConfirm = async () => {
    await onConfirm()
    onClose()
  }
  
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return "AlertTriangle"
      case "warning":
        return "AlertCircle"
      default:
        return "HelpCircle"
    }
  }
  
  const getIconColor = () => {
    switch (variant) {
      case "danger":
        return "text-error"
      case "warning":
        return "text-warning"
      default:
        return "text-primary"
    }
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`mx-auto w-16 h-16 mb-6 ${getIconColor()}`}
        >
          <ApperIcon name={getIcon()} size={64} />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          
          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ApperIcon name="Loader2" size={16} />
                </motion.div>
                Processing...
              </div>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
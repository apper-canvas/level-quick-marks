import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Modal from "@/components/atoms/Modal"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"
import TagPill from "@/components/atoms/TagPill"
import ApperIcon from "@/components/ApperIcon"
import { bookmarkService } from "@/services/api/bookmarkService"
import { tagService } from "@/services/api/tagService"

const AddBookmarkModal = ({ isOpen, onClose, onBookmarkAdded, tags = [] }) => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
    tags: []
  })
  const [newTagName, setNewTagName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFetchingTitle, setIsFetchingTitle] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        url: "",
        title: "",
        description: "",
        tags: []
      })
      setNewTagName("")
      setErrors({})
    }
  }, [isOpen])
  
  const validateUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  const fetchTitleFromUrl = async (url) => {
    if (!validateUrl(url)) return
    
    setIsFetchingTitle(true)
    try {
      // Simulate title fetching - in a real app, you'd use a service or API
      const domain = new URL(url).hostname.replace("www.", "")
      const mockTitle = `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Website`
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!formData.title) {
        setFormData(prev => ({ ...prev, title: mockTitle }))
      }
    } catch (error) {
      console.error("Failed to fetch title:", error)
    } finally {
      setIsFetchingTitle(false)
    }
  }
  
  const handleUrlChange = (e) => {
    const url = e.target.value
    setFormData(prev => ({ ...prev, url }))
    
    // Clear URL error if it was invalid before
    if (errors.url && validateUrl(url)) {
      setErrors(prev => ({ ...prev, url: null }))
    }
    
    // Auto-fetch title if URL is valid and title is empty
    if (validateUrl(url) && !formData.title.trim()) {
      fetchTitleFromUrl(url)
    }
  }
  
  const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }
  
  const handleTagSelect = (tagName) => {
    if (formData.tags.includes(tagName)) {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tagName)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName]
      }))
    }
  }
  
  const handleAddNewTag = async () => {
    const trimmedName = newTagName.trim()
    if (!trimmedName) return
    
    // Check if tag already exists
    const existingTag = tags.find(t => t.name.toLowerCase() === trimmedName.toLowerCase())
    if (existingTag) {
      handleTagSelect(existingTag.name)
      setNewTagName("")
      return
    }
    
    try {
      const newTag = await tagService.create({ name: trimmedName })
      handleTagSelect(newTag.name)
      setNewTagName("")
      toast.success(`Tag "${trimmedName}" created!`)
    } catch (error) {
      toast.error(error.message || "Failed to create tag")
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newTagName.trim()) {
      e.preventDefault()
      handleAddNewTag()
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.url.trim()) {
      newErrors.url = "URL is required"
    } else if (!validateUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL"
    }
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      const bookmark = await bookmarkService.create({
        ...formData,
        url: formData.url.trim(),
        title: formData.title.trim(),
        description: formData.description.trim()
      })
      
      toast.success("Bookmark added successfully!")
      onBookmarkAdded(bookmark)
      onClose()
    } catch (error) {
      toast.error(error.message || "Failed to add bookmark")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const getTagData = (tagName) => {
    return tags.find(t => t.name === tagName) || {
      name: tagName,
      color: "#5B7FFF",
      Id: `temp-${tagName}`
    }
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Bookmark"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Field */}
        <div>
          <Label htmlFor="url" required>
            URL
          </Label>
          <div className="relative">
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={handleUrlChange}
              placeholder="https://example.com"
              error={!!errors.url}
              disabled={isSubmitting}
            />
            {isFetchingTitle && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <ApperIcon name="Loader2" size={16} className="animate-spin text-primary" />
              </div>
            )}
          </div>
          {errors.url && (
            <p className="text-error text-sm mt-1">{errors.url}</p>
          )}
        </div>
        
        {/* Title Field */}
        <div>
          <Label htmlFor="title" required>
            Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Bookmark title"
            error={!!errors.title}
            disabled={isSubmitting || isFetchingTitle}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title}</p>
          )}
        </div>
        
        {/* Description Field */}
        <div>
          <Label htmlFor="description">
            Description (optional)
          </Label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Brief description of the bookmark"
            rows={3}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-400"
          />
        </div>
        
        {/* Tags Section */}
        <div>
          <Label>
            Tags (optional)
          </Label>
          
          {/* Selected Tags */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tagName => {
                const tagData = getTagData(tagName)
                return (
                  <TagPill
                    key={tagData.Id}
                    tag={tagData}
                    isSelected
                    onRemove={() => handleTagSelect(tagName)}
                  />
                )
              })}
            </div>
          )}
          
          {/* Available Tags */}
          {tags.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Select existing tags:</p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {tags
                  .filter(tag => !formData.tags.includes(tag.name))
                  .map(tag => (
                    <TagPill
                      key={tag.Id}
                      tag={tag}
                      onClick={() => handleTagSelect(tag.name)}
                      showCount
                    />
                  ))}
              </div>
            </div>
          )}
          
          {/* Add New Tag */}
          <div className="flex gap-2">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add new tag..."
              disabled={isSubmitting}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddNewTag}
              disabled={!newTagName.trim() || isSubmitting}
            >
              <ApperIcon name="Plus" size={16} />
            </Button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting || isFetchingTitle}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
                Adding...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ApperIcon name="Plus" size={16} />
                Add Bookmark
              </div>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddBookmarkModal
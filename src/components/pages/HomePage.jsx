import React, { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import SearchBar from "@/components/molecules/SearchBar"
import TagFilter from "@/components/molecules/TagFilter"
import BookmarkList from "@/components/organisms/BookmarkList"
import AddBookmarkModal from "@/components/organisms/AddBookmarkModal"
import EditBookmarkModal from "@/components/organisms/EditBookmarkModal"
import FloatingActionButton from "@/components/organisms/FloatingActionButton"
import ConfirmDialog from "@/components/molecules/ConfirmDialog"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import { bookmarkService } from "@/services/api/bookmarkService"
import { tagService } from "@/services/api/tagService"

const HomePage = () => {
  // Data state
  const [bookmarks, setBookmarks] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [filteredBookmarks, setFilteredBookmarks] = useState([])
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingBookmark, setDeletingBookmark] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Initialize data from localStorage and load
  useEffect(() => {
    bookmarkService.initializeFromStorage()
    tagService.initializeFromStorage()
    loadData()
  }, [])
  
  // Filter bookmarks when search or tag filters change
  useEffect(() => {
    filterBookmarks()
  }, [bookmarks, searchQuery, selectedTags])
  
  const loadData = async () => {
    setLoading(true)
    setError("")
    
    try {
      const [bookmarksData, tagsData] = await Promise.all([
        bookmarkService.getAll(),
        tagService.getAll()
      ])
      
      setBookmarks(bookmarksData)
      
      // Update tag counts based on current bookmarks
      const updatedTags = await tagService.updateCounts(bookmarksData)
      setTags(updatedTags)
      
    } catch (err) {
      setError(err.message || "Failed to load bookmarks")
    } finally {
      setLoading(false)
    }
  }
  
  const filterBookmarks = useCallback(() => {
    let filtered = [...bookmarks]
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.description.toLowerCase().includes(query) ||
        bookmark.url.toLowerCase().includes(query) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(bookmark =>
        selectedTags.every(tagName => bookmark.tags.includes(tagName))
      )
    }
    
    setFilteredBookmarks(filtered)
  }, [bookmarks, searchQuery, selectedTags])
  
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  const handleTagSelect = (tagName) => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }
  
  const handleClearFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }
  
  const handleBookmarkAdded = async (newBookmark) => {
    setBookmarks(prev => [newBookmark, ...prev])
    // Refresh tags to update counts
    const updatedTags = await tagService.getAll()
    setTags(updatedTags)
  }
  
  const handleBookmarkUpdated = async (updatedBookmark) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.Id === updatedBookmark.Id ? updatedBookmark : bookmark
      )
    )
    // Refresh tags to update counts
    const updatedTags = await tagService.getAll()
    setTags(updatedTags)
  }
  
  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark)
    setShowEditModal(true)
  }
  
  const handleDeleteBookmark = (bookmark) => {
    setDeletingBookmark(bookmark)
    setShowDeleteConfirm(true)
  }
  
  const confirmDelete = async () => {
    if (!deletingBookmark) return
    
    setIsDeleting(true)
    try {
      await bookmarkService.delete(deletingBookmark.Id)
      setBookmarks(prev => prev.filter(b => b.Id !== deletingBookmark.Id))
      
      // Refresh tags to update counts
      const updatedTags = await tagService.getAll()
      setTags(updatedTags)
      
      toast.success("Bookmark deleted successfully!")
    } catch (error) {
      toast.error(error.message || "Failed to delete bookmark")
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
      setDeletingBookmark(null)
    }
  }
  
  const handleRetry = () => {
    loadData()
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Loading />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ErrorView message={error} onRetry={handleRetry} />
        </div>
      </div>
    )
  }
  
  const hasBookmarks = bookmarks.length > 0
  const hasResults = filteredBookmarks.length > 0
  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0
  
  return (
<div className="min-h-full bg-background">
      
      {/* Main Content */}
<div className="p-6">
        {hasBookmarks ? (
          <>
            {/* Filters */}
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              onClearFilters={handleClearFilters}
              className="mb-8"
            />
            
            {/* Results */}
            {hasResults ? (
              <BookmarkList
                bookmarks={filteredBookmarks}
                tags={tags}
                onEdit={handleEditBookmark}
                onDelete={handleDeleteBookmark}
              />
            ) : (
              <Empty
                title={hasActiveFilters ? "No matches found" : "No bookmarks yet"}
                description={
                  hasActiveFilters
                    ? "Try adjusting your search terms or clearing filters to see more results."
                    : "Start building your collection by adding your first bookmark."
                }
                actionLabel={hasActiveFilters ? "Clear Filters" : "Add Bookmark"}
                onAction={hasActiveFilters ? handleClearFilters : () => setShowAddModal(true)}
                icon={hasActiveFilters ? "Search" : "Bookmark"}
              />
            )}
          </>
        ) : (
          <Empty
            title="Welcome to Quick Marks!"
            description="Start building your bookmark collection by adding your first link. Save any website with tags to organize and find them later."
            actionLabel="Add Your First Bookmark"
            onAction={() => setShowAddModal(true)}
            icon="Bookmark"
          />
        )}
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setShowAddModal(true)} />
      
      {/* Modals */}
      <AddBookmarkModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onBookmarkAdded={handleBookmarkAdded}
        tags={tags}
      />
      
      <EditBookmarkModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingBookmark(null)
        }}
        bookmark={editingBookmark}
        onBookmarkUpdated={handleBookmarkUpdated}
        tags={tags}
      />
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false)
          setDeletingBookmark(null)
        }}
        onConfirm={confirmDelete}
        title="Delete Bookmark"
        message={`Are you sure you want to delete "${deletingBookmark?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}

export default HomePage
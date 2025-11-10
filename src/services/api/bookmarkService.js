import bookmarksData from "@/services/mockData/bookmarks.json"

let bookmarks = [...bookmarksData]

const delay = () => new Promise(resolve => setTimeout(resolve, 200))

export const bookmarkService = {
  async getAll() {
    await delay()
    return [...bookmarks]
  },

  async getById(id) {
    await delay()
    const bookmark = bookmarks.find(b => b.Id === parseInt(id))
    if (!bookmark) {
      throw new Error("Bookmark not found")
    }
    return { ...bookmark }
  },

  async create(bookmarkData) {
    await delay()
    const newBookmark = {
      ...bookmarkData,
      Id: Math.max(...bookmarks.map(b => b.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    bookmarks = [...bookmarks, newBookmark]
    // Update localStorage
    localStorage.setItem("quickmarks_bookmarks", JSON.stringify(bookmarks))
    return { ...newBookmark }
  },

  async update(id, updates) {
    await delay()
    const index = bookmarks.findIndex(b => b.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Bookmark not found")
    }
    const updatedBookmark = {
      ...bookmarks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    bookmarks[index] = updatedBookmark
    // Update localStorage
    localStorage.setItem("quickmarks_bookmarks", JSON.stringify(bookmarks))
    return { ...updatedBookmark }
  },

  async delete(id) {
    await delay()
    const index = bookmarks.findIndex(b => b.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Bookmark not found")
    }
    bookmarks = bookmarks.filter(b => b.Id !== parseInt(id))
    // Update localStorage
    localStorage.setItem("quickmarks_bookmarks", JSON.stringify(bookmarks))
    return true
  },

  // Search bookmarks
  async search(query) {
    await delay()
    const searchTerm = query.toLowerCase()
    return bookmarks.filter(bookmark => 
      bookmark.title.toLowerCase().includes(searchTerm) ||
      bookmark.description.toLowerCase().includes(searchTerm) ||
      bookmark.url.toLowerCase().includes(searchTerm) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  },

  // Filter by tags
  async filterByTags(tagNames) {
    await delay()
    if (!tagNames || tagNames.length === 0) return [...bookmarks]
    
    return bookmarks.filter(bookmark =>
      tagNames.every(tagName => bookmark.tags.includes(tagName))
    )
  },

  // Initialize from localStorage
  initializeFromStorage() {
    const stored = localStorage.getItem("quickmarks_bookmarks")
    if (stored) {
      try {
        bookmarks = JSON.parse(stored)
      } catch (error) {
        console.error("Error loading bookmarks from storage:", error)
        // Reset to default if corrupted
        bookmarks = [...bookmarksData]
      }
    }
  }
}
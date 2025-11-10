import tagsData from "@/services/mockData/tags.json"

let tags = [...tagsData]

const delay = () => new Promise(resolve => setTimeout(resolve, 150))

const availableColors = [
  "#5B7FFF", "#8B5FFF", "#51CF66", "#FFA94D", "#FF6B6B",
  "#B197FC", "#74C0FC", "#FFD43B", "#63E6BE", "#FFABF0",
  "#ADB5BD", "#748FFC", "#96F2D7", "#FFE066", "#FCC2D7",
  "#A9E34B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"
]

export const tagService = {
  async getAll() {
    await delay()
    return [...tags]
  },

  async getById(id) {
    await delay()
    const tag = tags.find(t => t.Id === parseInt(id))
    if (!tag) {
      throw new Error("Tag not found")
    }
    return { ...tag }
  },

  async create(tagData) {
    await delay()
    // Check if tag name already exists
    const existingTag = tags.find(t => t.name.toLowerCase() === tagData.name.toLowerCase())
    if (existingTag) {
      throw new Error("Tag name already exists")
    }
    
    const newTag = {
      ...tagData,
      Id: Math.max(...tags.map(t => t.Id)) + 1,
      color: tagData.color || this.getRandomColor(),
      count: 0
    }
    tags = [...tags, newTag]
    // Update localStorage
    localStorage.setItem("quickmarks_tags", JSON.stringify(tags))
    return { ...newTag }
  },

  async update(id, updates) {
    await delay()
    const index = tags.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Tag not found")
    }
    
    // Check if new name conflicts with existing tag
    if (updates.name) {
      const existingTag = tags.find(t => 
        t.Id !== parseInt(id) && 
        t.name.toLowerCase() === updates.name.toLowerCase()
      )
      if (existingTag) {
        throw new Error("Tag name already exists")
      }
    }
    
    const updatedTag = {
      ...tags[index],
      ...updates
    }
    tags[index] = updatedTag
    // Update localStorage
    localStorage.setItem("quickmarks_tags", JSON.stringify(tags))
    return { ...updatedTag }
  },

  async delete(id) {
    await delay()
    const index = tags.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Tag not found")
    }
    tags = tags.filter(t => t.Id !== parseInt(id))
    // Update localStorage
    localStorage.setItem("quickmarks_tags", JSON.stringify(tags))
    return true
  },

  // Find or create tag by name
  async findOrCreate(tagName) {
    await delay()
    const existingTag = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase())
    if (existingTag) {
      return { ...existingTag }
    }
    
    return this.create({ name: tagName })
  },

  // Update tag usage counts
  async updateCounts(bookmarks) {
    await delay()
    // Count occurrences of each tag
    const tagCounts = {}
    bookmarks.forEach(bookmark => {
      bookmark.tags.forEach(tagName => {
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1
      })
    })
    
    // Update tag counts
    tags = tags.map(tag => ({
      ...tag,
      count: tagCounts[tag.name] || 0
    }))
    
    // Update localStorage
    localStorage.setItem("quickmarks_tags", JSON.stringify(tags))
    return [...tags]
  },

  getRandomColor() {
    return availableColors[Math.floor(Math.random() * availableColors.length)]
  },

  // Initialize from localStorage
  initializeFromStorage() {
    const stored = localStorage.getItem("quickmarks_tags")
    if (stored) {
      try {
        tags = JSON.parse(stored)
      } catch (error) {
        console.error("Error loading tags from storage:", error)
        // Reset to default if corrupted
        tags = [...tagsData]
      }
    }
  }
}
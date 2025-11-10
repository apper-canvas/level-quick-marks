import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

const handleSearch = (query) => {
    // Pass search to current page via event or context
    window.dispatchEvent(new window.CustomEvent('searchBookmarks', { detail: query }))
  }
  const sidebarVariants = {
    open: { width: '280px', opacity: 1 },
    closed: { width: '72px', opacity: 1 }
  }

  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={window.innerWidth >= 1024 ? sidebarVariants : mobileSidebarVariants}
        animate={window.innerWidth >= 1024 ? (sidebarOpen ? 'open' : 'closed') : (mobileMenuOpen ? 'open' : 'closed')}
        initial={window.innerWidth >= 1024 ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'bg-white border-r border-gray-200 flex flex-col shadow-sm',
          'fixed lg:relative h-full z-50 lg:z-auto',
          'w-72 lg:w-auto'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              animate={{ opacity: (sidebarOpen || mobileMenuOpen) ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Bookmark" size={18} className="text-white" />
              </div>
              {(sidebarOpen || window.innerWidth < 1024) && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Quick Marks
                  </h1>
                  <p className="text-xs text-gray-500">Bookmark Manager</p>
                </div>
              )}
            </motion.div>
            
            {/* Desktop Toggle */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ApperIcon 
                name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} 
                size={16} 
                className="text-gray-600" 
              />
            </button>
            
            {/* Mobile Close */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ApperIcon name="X" size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Section */}
        <motion.div
          className="p-4 border-b border-gray-200"
          animate={{ 
            opacity: (sidebarOpen || mobileMenuOpen) ? 1 : 0,
            height: (sidebarOpen || mobileMenuOpen) ? 'auto' : '0'
          }}
          transition={{ duration: 0.2 }}
        >
          {(sidebarOpen || window.innerWidth < 1024) && (
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search bookmarks..."
              className="w-full"
            />
          )}
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <motion.div
            animate={{ opacity: (sidebarOpen || mobileMenuOpen) ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {(sidebarOpen || window.innerWidth < 1024) && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1">
                  Navigation
                </div>
                <a
                  href="/"
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                    location.pathname === '/' 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <ApperIcon name="Home" size={18} />
                  <span>All Bookmarks</span>
                </a>
              </div>
            )}
          </motion.div>

          {/* Collapsed Navigation Icons */}
          {!sidebarOpen && window.innerWidth >= 1024 && (
            <div className="space-y-2">
              <a
                href="/"
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
                  location.pathname === '/' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-100'
                )}
                title="All Bookmarks"
              >
                <ApperIcon name="Home" size={18} />
              </a>
            </div>
          )}
        </nav>

        {/* Footer */}
        <motion.div
          className="p-4 border-t border-gray-200"
          animate={{ opacity: (sidebarOpen || mobileMenuOpen) ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {(sidebarOpen || window.innerWidth < 1024) && (
            <div className="text-xs text-gray-500 text-center">
              Save, organize, and find your favorite web links instantly
            </div>
          )}
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ApperIcon name="Menu" size={18} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded flex items-center justify-center">
                <ApperIcon name="Bookmark" size={14} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900">Quick Marks</span>
            </div>
            <div className="w-10 h-10"></div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
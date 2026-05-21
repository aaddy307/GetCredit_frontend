"use client";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Header({ onMenuClick, onTabChange }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchData = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/admin/search?q=${encodeURIComponent(searchQuery)}`, {
          credentials: 'include'
        });
        
        if (!response.ok) return;
        
        const data = await response.json();
        
        if (data.success) {
          setSearchResults(data.results || []);
          setShowResults(true);
        }
      } catch (error) {
        console.error('Search error:', error);
      }
      setLoading(false);
    };

    const debounce = setTimeout(searchData, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const getResultIcon = (type) => {
    switch (type) {
      case 'lead': return '👤';
      case 'callback': return '📞';
      case 'blog': return '📄';
      default: return '📋';
    }
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery("");

    switch (result.type) {
      case 'lead': onTabChange('leads'); break;
      case 'callback': onTabChange('callbacks'); break;
      case 'blog': onTabChange('blog'); break;
      default: break;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-2 sm:px-4 flex items-center flex-shrink-0">
      <div className="flex items-center justify-between gap-4 w-full">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex-1 max-w-xs sm:max-w-md md:max-w-xl relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, callbacks, blogs..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C9A84C] focus:bg-white transition-colors"
            />
          </div>

          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto mb-2"></div>
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  <p className="px-4 py-2 text-xs text-gray-500 border-b">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#C9A84C]/5 text-left"
                    >
                      <span className="text-lg">{getResultIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                        <p className="text-xs text-gray-500">{result.subtitle} • {result.type}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="p-4 text-center text-gray-500 text-sm">No results found for "{searchQuery}"</div>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-9 h-9 bg-gradient-to-br from-[#C9A84C] to-[#A8892A] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user?.name?.charAt(0)?.toUpperCase() || 'A'}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { BookOpen } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'learning', label: 'Learning Center' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News' },
    { id: 'about', label: 'About Us' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Yamoransa Model Lab 8</h1>
              <p className="text-blue-200 text-sm">Bogoso • STEM Education</p>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`hover:text-orange-300 transition-colors ${
                  currentPage === item.id ? 'text-orange-300 border-b-2 border-orange-300' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
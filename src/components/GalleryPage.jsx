import React, { useState } from 'react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryItems = [
    { type: 'award', year: '2023', title: 'Best STEM Initiative - Ghana Education Awards', category: 'Awards' },
    { type: 'event', year: '2023', title: 'National Robotics Competition - Kumasi', category: 'Events' },
    { type: 'workshop', year: '2022', title: 'Teacher Training Workshop - Bogoso', category: 'Workshops' },
    { type: 'student', year: '2023', title: 'Students Building Their First Robot', category: 'Projects' },
    { type: 'award', year: '2022', title: 'Innovation in Rural Education Award', category: 'Awards' },
    { type: 'event', year: '2023', title: 'Community STEM Fair - Western Region', category: 'Events' },
    { type: 'workshop', year: '2024', title: 'Arduino Programming Workshop - Tarkwa', category: 'Workshops' },
    { type: 'student', year: '2024', title: 'Line Following Robot Competition', category: 'Projects' },
    { type: 'event', year: '2022', title: 'Lab Opening Ceremony', category: 'Events' }
  ];

  const filteredGallery = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === selectedCategory);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'award', label: 'Awards' },
    { id: 'event', label: 'Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'student', label: 'Student Projects' }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600">
            Celebrating our achievements, events, and impact from 2022 to present
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedCategory(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    item.type === 'award' ? 'bg-yellow-500' :
                    item.type === 'event' ? 'bg-green-500' :
                    item.type === 'workshop' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}>
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {item.year}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{item.year}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
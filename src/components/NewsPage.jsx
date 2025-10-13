import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const NewsPage = () => {
  const [email, setEmail] = useState('');

  const newsItems = [
    {
      date: '2025-09-16',
      title: 'AI Workshop for Heads and Computing Teachers',
      excerpt: 'Yamoransa Model Lab 8 introduces advanced AI workshop targeting Heads and I.T educators across Prestea Huni-Valley Municipal and beyond.',
      category: 'Programs'
    },
    {
      date: '2025-02-27',
      title: 'Yamoransa Model Lab 8 record breaking Awards at AIRTAD 2025',
      excerpt: 'Most Innovative Project, Most Sustainable Lab, Best Center Managers',
      category: 'Achievements'
    },
    {
      date: '2023-12-20',
      title: 'Yamoransa Model Lab 8 wins big at AIRTAD 2024',
      excerpt: 'Most Innovative Project, Most Sustainable Lab, 2nd place Best Center Managers',
      category: 'Donations'
    },
    {
      date: '2025-03-12',
      title: 'Yamoransa Model Lab 8 Excel at Academic City University Tech Expo 2025',
      excerpt: '2 students from our team competed and won the Most Innovative Project (Senior High School Category)',
      category: 'Achievements'
    },
    {
      date: '2025-11-30',
      title: 'New Python Programming Course for Teens Announced',
      excerpt: 'Registration now open for our comprehensive 6-week Python course designed specifically for teenagers.',
      category: 'Programs'
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Latest News</h1>
          <p className="text-xl text-gray-600">
            Stay updated with our latest developments, partnerships, and achievements
          </p>
        </div>

        <div className="space-y-8">
          {newsItems.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-16">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Stay Informed</h3>
            <p className="text-blue-700">Subscribe to our newsletter for the latest updates and educational resources</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Heart, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Learning Center', path: '/learning' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News', path: '/news' },
    { name: 'About Us', path: '/about' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-ymlab-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-ymlab-orange p-2 rounded-lg">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Yamoransa Model Lab 8</h1>
                <p className="text-blue-200 text-sm">Bogoso • STEM Education</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button (Desktop) */}
            <Link
              to="/donate"
              className="hidden lg:flex items-center bg-ymlab-orange hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Heart className="h-4 w-4 mr-2" />
              Donate
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActivePath(item.path)
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-ymlab-orange p-2 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">YM Lab 8</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Empowering rural and urban education through innovative STEM programs, 
                robotics training, and technology integration.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-blue-400 hover:bg-blue-500 p-2 rounded transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-blue-800 hover:bg-blue-900 p-2 rounded transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navigation.slice(0, 4).map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Programs</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Robotics Fundamentals</li>
                <li>• Scratch Programming</li>
                <li>• Python for Young Programmers</li>
                <li>• AI & Machine Learning</li>
                <li>• Teacher Training Workshops</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>info@ymlab8-bogoso.org</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+233 XX XXX XXXX</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Bogoso, Western Region, Ghana</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 Yamoransa Model Lab 8, Bogoso. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <Link
        to="/donate"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-40"
        title="Make a Donation"
      >
        <Heart className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Layout;
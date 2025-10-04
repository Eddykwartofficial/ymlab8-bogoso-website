import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ProgramsPage from './components/ProgramsPage';
import LearningCenter from './components/LearningCenter';
import ContactPage from './components/ContactPage';
import { BookOpen } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProgram, setSelectedProgram] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProgram={setSelectedProgram} />;
      case 'programs':
        return <ProgramsPage />;
      case 'learning':
        return <LearningCenter />;
      case 'contact':
        return <ContactPage />;
      case 'gallery':
        return <div className="p-8 min-h-screen"><h2 className="text-2xl">Gallery (Coming Soon)</h2></div>;
      case 'news':
        return <div className="p-8 min-h-screen"><h2 className="text-2xl">News (Coming Soon)</h2></div>;
      case 'about':
        return <div className="p-8 min-h-screen"><h2 className="text-2xl">About Us (Coming Soon)</h2></div>;
      case 'donate':
        return <div className="p-8 min-h-screen"><h2 className="text-2xl">Donate (Coming Soon)</h2></div>;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProgram={setSelectedProgram} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">YM Lab 8</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Empowering rural and urban education through innovative STEM programs.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setCurrentPage('programs')} className="hover:text-white">Programs</button></li>
                <li><button onClick={() => setCurrentPage('learning')} className="hover:text-white">Learning Center</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Robotics Fundamentals</li>
                <li>Scratch Programming</li>
                <li>Python for Young Programmers</li>
                <li>AI & Machine Learning</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-300">
                Bogoso, Western Region<br />
                Ghana<br />
                ymlab8cm@gmail.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>2025 Yamoransa Model Lab 8, Bogoso. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { programs } from './data/programsData';

const HomePage = ({ setCurrentPage, setSelectedProgram }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Empowering Rural & Urban Education Through
            <span className="text-orange-400"> Technology</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Yamoransa Model Lab 8 equips teachers with simple methodologies for teaching robotics, 
            programming, and computing while providing students with hands-on STEM learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('programs')}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Explore Programs <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => setCurrentPage('learning')}
              className="border border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Learning
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-900 mb-2">1867+</div>
              <div className="text-gray-600">Teachers Trained</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">32,500+</div>
              <div className="text-gray-600">Students Reached</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">35</div>
              <div className="text-gray-600">Schools Partnered</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">8+</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map(program => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {program.level}
                    </span>
                    <span className="text-gray-500 text-sm">{program.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <button 
                    onClick={() => { setSelectedProgram(program); setCurrentPage('programs'); }}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Education in Your School?</h2>
          <p className="text-xl mb-8">
            Join hundreds of educators who have already revolutionized their STEM teaching approach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Schedule a Workshop
            </button>
            <button 
              onClick={() => setCurrentPage('donate')}
              className="border border-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Support Our Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import React, { useState } from 'react';
import { programs } from '../data/programsData';

const ProgramsPage = () => {
  const [workshopForm, setWorkshopForm] = useState({
    name: '',
    email: '',
    program: '',
    participants: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Workshop registration submitted! We will contact you soon.');
    setWorkshopForm({ name: '', email: '', program: '', participants: '' });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive robotics and computing education programs designed for different skill levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map(program => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    program.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    program.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {program.level}
                  </span>
                  <span className="text-gray-500">{program.duration}</span>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.topics.map((topic, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Target Audience:</h4>
                  <p className="text-gray-600">{program.targetAudience}</p>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Register for Workshop
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Registration Form */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register for a Workshop</h3>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={workshopForm.name}
                onChange={(e) => setWorkshopForm({...workshopForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={workshopForm.email}
                onChange={(e) => setWorkshopForm({...workshopForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={workshopForm.program}
                onChange={(e) => setWorkshopForm({...workshopForm, program: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Program</option>
                {programs.map(program => (
                  <option key={program.id} value={program.title}>{program.title}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Number of Participants"
                value={workshopForm.participants}
                onChange={(e) => setWorkshopForm({...workshopForm, participants: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="1"
              />
            </div>
            <button 
              type="submit"
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
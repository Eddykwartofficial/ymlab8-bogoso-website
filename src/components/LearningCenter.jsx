import React, { useState } from 'react';
import { BookOpen, Users, Globe, Download } from 'lucide-react';
import QuizComponent from './QuizComponent';
import { quizQuestions } from './data/programsData';

const LearningCenter = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Learning Center</h1>
          <p className="text-xl text-gray-600">
            Interactive resources for teachers, students, and lifelong learners
          </p>
        </div>

        {/* Learning Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-blue-800">For Teachers</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Lesson Plans & Curricula</li>
              <li>• Teaching Methodologies</li>
              <li>• Assessment Tools</li>
              <li>• Professional Development</li>
            </ul>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Access Resources
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-green-800">For Students</h3>
            <ul className="space-y-2 text-green-700">
              <li>• Interactive Tutorials</li>
              <li>• Coding Challenges</li>
              <li>• Project Ideas</li>
              <li>• Quiz & Assessments</li>
            </ul>
            <button 
              onClick={() => setShowQuiz(true)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Take a Quiz
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <Globe className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-purple-800">For Parents</h3>
            <ul className="space-y-2 text-purple-700">
              <li>• Technology Trends</li>
              <li>• Career Guidance</li>
              <li>• Home Learning Tips</li>
              <li>• Success Stories</li>
            </ul>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Get Informed
            </button>
          </div>
        </div>

        {/* Quiz Section */}
        {showQuiz ? (
          <div className="mb-16">
            <button 
              onClick={() => setShowQuiz(false)}
              className="mb-4 text-blue-600 hover:text-blue-800"
            >
              ← Back to Learning Center
            </button>
            <QuizComponent quizData={quizQuestions} />
          </div>
        ) : null}

        {/* Downloadable Resources */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Downloadable Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Arduino Starter Guide', type: 'PDF', size: '2.3 MB' },
              { title: 'Scratch Programming Basics', type: 'PDF', size: '1.8 MB' },
              { title: 'Robot Building Checklist', type: 'PDF', size: '0.5 MB' },
              { title: 'Lesson Plan Template', type: 'DOC', size: '0.8 MB' },
              { title: 'Python Cheat Sheet', type: 'PDF', size: '1.2 MB' },
              { title: 'STEM Assessment Rubric', type: 'PDF', size: '0.7 MB' }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <Download className="h-8 w-8 text-blue-600" />
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{resource.size}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
import React from 'react';
import { BookOpen, Globe, Users, Award } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Edward Kwarteng Owusu', role: 'Lead Center Manager', expertise: 'Robotics Education, Curriculum Development' },
    { name: 'Elvis Kan-Uge', role: 'Assistant Center Manager', expertise: 'Teacher Training, Community Outreach' },
    { name: 'Adriana Oppong', role: 'Assistant Center Manager', expertise: 'Programming, Digital Literacy Officer' },
    { name: 'Ghapson Buabeng', role: 'Education Specialist', expertise: 'Pedagogy, Assessment Design' },
    { name: 'Nana Nteboa Prah IV', role: 'Promoter', expertise: 'Communication Studies' },

  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Yamoransa Model Lab 8</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Located in the heart of Bogoso, Western Region of Ghana, Yamoransa Model Lab 8 is pioneering 
            the integration of robotics, programming, and computing education in both rural and urban schools. 
            Our mission is to democratize STEM education and prepare the next generation for a technology-driven world.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800">Our Mission</h2>
            </div>
            <p className="text-blue-700 leading-relaxed">
              To equip teachers with simple, effective methodologies for teaching robotics, programming, 
              and computing while providing students with hands-on STEM learning experiences that prepare 
              them for the digital future.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500 p-3 rounded-lg mr-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-orange-800">Our Vision</h2>
            </div>
            <p className="text-orange-700 leading-relaxed">
              To become the leading hub for STEM education in West Africa, bridging the digital divide 
              between rural and urban communities through accessible, quality technology education 
              and innovative teaching methodologies.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2020 in Bogoso, a mining town in Ghana's Western Region, Yamoransa Model Lab 8 
                emerged from a simple observation: while urban schools had some access to technology education, 
                rural schools were being left behind in the digital revolution.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our founders, recognizing this gap, established the lab with a vision to create simple, 
                replicable methodologies that any teacher—regardless of their technical background—could 
                use to introduce robotics and programming to their students.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we've grown from serving a single school to partnering with over 45 institutions 
                across the region, training thousands of teachers, and impacting ten thousands of students. 
                Our success has earned us recognition both nationally and internationally, but our mission 
                remains unchanged: making STEM education accessible to all.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Impact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">1500+</div>
              <div className="text-blue-200">Teachers Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30,500+</div>
              <div className="text-blue-200">Students Reached</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45</div>
              <div className="text-blue-200">Partner Schools</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-200">Awards Received</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
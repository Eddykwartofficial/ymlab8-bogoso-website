import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleDonate = (e) => {
    e.preventDefault();
    alert(`Thank you for your donation of GHS ${donationAmount}! Payment integration will be set up with Paystack/Flutterwave.`);
    setDonationAmount('');
    setDonorInfo({ name: '', email: '', phone: '' });
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Support Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your support helps us bridge the digital divide and bring quality STEM education to rural and urban schools across Ghana
          </p>
        </div>

        {/* Donation Impact */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">₵1,000</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Learning Materials</h3>
            <p className="text-green-700">Provides learning materials and worksheets for 10 students</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">₵900</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Arduino Kit</h3>
            <p className="text-blue-700">Funds a complete Arduino starter kit for hands-on learning</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 text-center">
            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">₵2,000</span>
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Teacher Training</h3>
            <p className="text-purple-700">Sponsors a teacher's complete robotics training program</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>
            
            <form onSubmit={handleDonate}>
              {/* Donation Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount (GHS)</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {['50', '100', '200', '500', '1000', '2000'].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`py-2 px-4 border rounded-lg font-medium transition-colors ${
                        donationAmount === amount
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ₵{amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Donor Information */}
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors mb-4"
              >
                Donate ₵{donationAmount || '0'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                Your donation is secure and will be used to support STEM education initiatives
              </p>
            </form>
          </div>

          {/* Other Ways to Help */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Other Ways to Support</h2>
            
            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Equipment Donations</h3>
                <p className="text-orange-700 mb-4">
                  We accept donations of laptops, Arduino kits, robotics components, and other educational technology
                </p>
                <ul className="text-orange-700 text-sm space-y-1 mb-4">
                  <li>• Laptops and tablets</li>
                  <li>•EV3 Lego Mindstorm, Vex Robots & Spike Prime</li>
                  <li>• Arduino and Raspberry Pi kits</li>
                  <li>• Sensors and electronic components</li>
                  <li>• 3D printers and accessories</li>
                </ul>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Contact About Equipment
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Volunteer Your Expertise</h3>
                <p className="text-blue-700 mb-4">
                  Share your knowledge and skills with our community of educators and students
                </p>
                <ul className="text-blue-700 text-sm space-y-1 mb-4">
                  <li>• Conduct virtual workshops</li>
                  <li>• Develop curriculum content</li>
                  <li>• Mentor students and teachers</li>
                  <li>• Provide technical consultancy</li>
                </ul>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Become a Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Financial Transparency</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Direct Program Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
              <div className="text-gray-600">Administrative Costs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5%</div>
              <div className="text-gray-600">Fundraising Activities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
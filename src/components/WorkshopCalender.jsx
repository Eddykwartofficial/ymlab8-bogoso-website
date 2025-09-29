import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format, parseISO, isFuture, isPast } from 'date-fns';

const WorkshopCalendar = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    participants: 1,
    role: 'teacher', // teacher, student, parent, admin
  });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_STRAPI_API_URL}/workshops`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          },
          params: {
            sort: ['date:asc'],
            populate: '*',
          },
        }
      );
      setWorkshops(response.data.data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
      toast.error('Failed to load workshops');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (selectedWorkshop.attributes.registeredParticipants >= selectedWorkshop.attributes.capacity) {
      toast.error('This workshop is fully booked');
      return;
    }

    try {
      // Submit registration
      await axios.post(
        `${import.meta.env.VITE_STRAPI_API_URL}/workshop-registrations`,
        {
          data: {
            workshop: selectedWorkshop.id,
            ...formData,
            registrationDate: new Date().toISOString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          },
        }
      );

      // Update workshop participant count
      await axios.put(
        `${import.meta.env.VITE_STRAPI_API_URL}/workshops/${selectedWorkshop.id}`,
        {
          data: {
            registeredParticipants:
              selectedWorkshop.attributes.registeredParticipants + parseInt(formData.participants),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
          },
        }
      );

      toast.success('Registration successful! Check your email for confirmation.');
      setShowRegistrationForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        participants: 1,
        role: 'teacher',
      });
      fetchWorkshops();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const getAvailabilityStatus = (workshop) => {
    const registered = workshop.attributes.registeredParticipants || 0;
    const capacity = workshop.attributes.capacity;
    const available = capacity - registered;
    const percentage = (registered / capacity) * 100;

    if (percentage >= 100) return { text: 'Fully Booked', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage >= 80) return { text: `Only ${available} spots left`, color: 'text-orange-600', bg: 'bg-orange-100' };
    return { text: `${available} spots available`, color: 'text-green-600', bg: 'bg-green-100' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ymlab-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Workshops</h2>
        <p className="text-gray-600 text-lg">
          Register for our hands-on training sessions in robotics and programming
        </p>
      </div>

      {/* Workshop Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {workshops
          .filter(workshop => isFuture(parseISO(workshop.attributes.date)))
          .map((workshop) => {
            const availability = getAvailabilityStatus(workshop);
            const isFullyBooked =
              workshop.attributes.registeredParticipants >= workshop.attributes.capacity;

            return (
              <div key={workshop.id} className="card p-6">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${availability.bg} ${availability.color}`}>
                    {availability.text}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {workshop.attributes.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {workshop.attributes.description}
                </p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-ymlab-blue" />
                    <span>{format(parseISO(workshop.attributes.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-ymlab-blue" />
                    <span>{workshop.attributes.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-ymlab-blue" />
                    <span>{workshop.attributes.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-ymlab-blue" />
                    <span>
                      {workshop.attributes.registeredParticipants || 0} / {workshop.attributes.capacity} registered
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-ymlab-blue h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          ((workshop.attributes.registeredParticipants || 0) /
                            workshop.attributes.capacity) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedWorkshop(workshop);
                    setShowRegistrationForm(true);
                  }}
                  disabled={isFullyBooked}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    isFullyBooked
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isFullyBooked ? 'Fully Booked' : 'Register Now'}
                </button>
              </div>
            );
          })}
      </div>

      {/* Registration Modal */}
      {showRegistrationForm && selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Register for Workshop
                </h3>
                <p className="text-gray-600">{selectedWorkshop.attributes.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowRegistrationForm(false);
                  setSelectedWorkshop(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization/School
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
                  placeholder="Your school or organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
                >
                  <option value="teacher">Teacher/Educator</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="admin">School Administrator</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Participants
                </label>
                <input
                  type="number"
                  min="1"
                  max={
                    selectedWorkshop.attributes.capacity -
                    (selectedWorkshop.attributes.registeredParticipants || 0)
                  }
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Workshop Details</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>📅 Date: {format(parseISO(selectedWorkshop.attributes.date), 'MMMM d, yyyy')}</li>
                  <li>⏰ Time: {selectedWorkshop.attributes.time}</li>
                  <li>📍 Location: {selectedWorkshop.attributes.location}</li>
                  <li>👥 Available Spots: {selectedWorkshop.attributes.capacity - (selectedWorkshop.attributes.registeredParticipants || 0)}</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegistrationForm(false);
                    setSelectedWorkshop(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Past Workshops Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Past Workshops</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops
            .filter(workshop => isPast(parseISO(workshop.attributes.date)))
            .slice(0, 6)
            .map((workshop) => (
              <div key={workshop.id} className="card p-6 opacity-75">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-600">
                    Completed
                  </span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {workshop.attributes.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {format(parseISO(workshop.attributes.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {workshop.attributes.registeredParticipants || 0} participants attended
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopCalendar;
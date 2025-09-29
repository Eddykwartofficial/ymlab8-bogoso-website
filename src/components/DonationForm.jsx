import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import axios from 'axios';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    donationType: 'one-time',
  });

  const [customAmount, setCustomAmount] = useState('');

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const presetAmounts = [50, 100, 200, 500, 1000, 2000];

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, amount: amount.toString() });
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setFormData({ ...formData, amount: e.target.value });
  };

  const componentProps = {
    email: formData.email,
    amount: parseFloat(formData.amount) * 100, // Paystack expects amount in kobo
    publicKey,
    text: `Donate GHS ${formData.amount}`,
    onSuccess: async (reference) => {
      toast.success('Thank you for your donation!');
      
      // Log donation to backend/CMS
      try {
        await axios.post(
          `${import.meta.env.VITE_STRAPI_API_URL}/donations`,
          {
            data: {
              reference: reference.reference,
              amount: formData.amount,
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              donationType: formData.donationType,
              status: 'successful',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );
      } catch (error) {
        console.error('Error logging donation:', error);
      }

      // Reset form
      setFormData({
        amount: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        donationType: 'one-time',
      });
      setCustomAmount('');
    },
    onClose: () => {
      toast.info('Donation cancelled');
    },
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.amount &&
      parseFloat(formData.amount) >= 10
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>

      {/* Preset Amounts */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Amount (GHS)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`py-2 px-4 border rounded-lg font-medium transition-colors ${
                formData.amount === amount.toString()
                  ? 'bg-ymlab-blue text-white border-ymlab-blue'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ₵{amount}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mt-4">
          <input
            type="number"
            placeholder="Custom amount (min. ₵10)"
            value={customAmount}
            onChange={handleCustomAmount}
            min="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ymlab-blue focus:border-transparent"
        />
      </div>

      {/* Donation Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Donation Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="donationType"
              value="one-time"
              checked={formData.donationType === 'one-time'}
              onChange={(e) => setFormData({ ...formData, donationType: e.target.value })}
              className="mr-2"
            />
            <span>One-time donation</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="donationType"
              value="monthly"
              checked={formData.donationType === 'monthly'}
              onChange={(e) => setFormData({ ...formData, donationType: e.target.value })}
              className="mr-2"
            />
            <span>Monthly recurring donation</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      {isFormValid() ? (
        <PaystackButton
          {...componentProps}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        />
      ) : (
        <button
          disabled
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
        >
          Please fill all required fields
        </button>
      )}

      <p className="text-sm text-gray-600 text-center mt-4">
        Your donation is secure and will directly support STEM education initiatives at YM Lab 8
      </p>
    </div>
  );
};

export default DonationForm;
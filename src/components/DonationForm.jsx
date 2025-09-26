import React, { useState } from 'react';
import './DonationForm.css'; // Assume this file contains styling from Tailwind/CSS

// --- 1. MOCK PAYSTACK INTEGRATION FUNCTION ---
// In a production environment, you would use the official Paystack React library or a server-side
// function to generate a secure transaction reference before opening the checkout.
const initiatePaystackPayment = (details) => {
    // --- API INTEGRATION POINT: Paystack Initialization ---
    console.log("Preparing to initialize Paystack checkout...");
    
    // Convert GHS to Kobo (Paystack requires amount in the smallest currency unit)
    const amountInKobo = details.amount * 100;
    
    // MOCK PAYSTACK CHECKOUT OBJECT
    const paystackConfig = {
        key: 'PK_TEST_YOUR_PUBLIC_KEY', // Replace with your actual Test or Live Key
        email: details.email,
        amount: amountInKobo,
        ref: `YMLAB8_${Date.now()}`, // Unique transaction reference
        channels: ['card', 'bank', 'ussd', 'mobile_money'],
        currency: 'GHS',
        metadata: {
            custom_fields: [{ display_name: "Donor Name", variable_name: "donor_name", value: details.name }]
        },
        callback: (response) => {
            // This function is called on successful payment
            console.log('Payment successful:', response);
            alert(`Thank you, ${details.name}! Your donation of GHC ${details.amount} was successful. Transaction Ref: ${response.reference}`);
            // In a real app, you'd verify this transaction on your server.
        },
        onClose: () => {
            console.log('Payment window closed.');
            alert('You closed the payment window. You can try again anytime!');
        },
    };

    // MOCK: Replace this alert with the actual call to PaystackPop.setup(paystackConfig) or a redirect.
    alert(`Initiating secure payment for GHC ${details.amount} from ${details.email}. Check console for mock config.`);
    // PaystackPop.setup(paystackConfig).openIframe(); // Actual live call would look like this
};


// --- 2. THE REACT COMPONENT ---
const DonationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: 50, // Default suggestion
    });

    const donationImpact = {
        50: "Contributes to a monthly internet subscription.",
        100: "Funds maintenance for one of our 48 computer units.",
        500: "Sponsors one teacher for a Robotics training session.",
        1000: "Procures a new Robotics kit for the MakerSpace."
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || formData.amount < 10) {
            alert("Please fill in all details and ensure the donation is GHC 10 or more.");
            return;
        }
        
        // Initiate the payment flow
        initiatePaystackPayment(formData);
    };

    const currentImpact = donationImpact[formData.amount] || "Supports general lab operations and outreach.";

    return (
        <div className="donation-wrapper">
            <h2>Support the Next Innovator</h2>
            <p>Your partnership ensures free and quality STEM education continues in Bogoso.</p>
            
            <form className="donation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Your Full Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Required" required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Your Email Address:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Required for receipt" required />
                </div>
                
                <div className="form-group amount-group">
                    <label htmlFor="amount">Donation Amount (GHC):</label>
                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} min="10" required />
                </div>
                
                <div className="impact-box">
                    **Impact:** {currentImpact}
                </div>

                <button type="submit" className="btn-cta">
                    <i className="fas fa-hand-holding-usd"></i> Donate Securely (GHC {formData.amount})
                </button>
            </form>
            
            <p className="small-text">Payments are processed by **Paystack** and your card details are never stored by us.</p>
        </div>
    );
};

export default DonationForm;
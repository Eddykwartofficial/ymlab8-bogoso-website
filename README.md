Yamoransa Model Lab 8 (YM Lab 8) Website 💻

This is the repository for the official website of the Yamoransa Model Lab 8 located in Bogoso, Western Region, Ghana. The site serves as a vital resource hub for students, teachers, parents, and donors, focusing on Robotics, Programming, and Computing education.

🚀 Project Goals
The primary objective of this website is to provide a comprehensive, educational, and professionally simple platform that supports the mission of YM Lab 8.

Educate Teachers: Provide access to simple methodologies and curricula for teaching robotics and programming.
Empower Students: Offer a Learning Centre with interactive tools, including a Quiz Section, tutorials, and resources.
Inform Stakeholders: Provide timely News, Gallery updates (including awards from 2022 to date), and program information.
Enable Donations: Offer a clear and secure path for donors to support the lab's mission.
⚙️ Technology Stack
This website is built using a modern, scalable architecture focused on performance and easy content management.

Component	Technology	Role in Project

Frontend	React (with Hooks)	Component-based UI development and state management (e.g., Quiz progress, User Roles).
Styling	Tailwind CSS (Recommended)	Utility-first framework for a clean, responsive, and maintainable design.
Content Management	Strapi (Headless CMS)	Manages all dynamic content (News, Gallery, Program Descriptions) via API.
Payment Gateway	Paystack / Flutterwave	Secure processing of online donations.
Events/Booking	Google Calendar API / Custom API	Manages and tracks capacity for Workshop Sign-ups.

📁 Project Structure
The core files reside in the src/ directory, organized by feature components:

ymlab8-bogoso-website/
├── public/
├── src/
│   ├── components/
│   │   ├── ContentFetcher.jsx         // Fetches News, Gallery, and Awards from CMS
│   │   ├── DonationForm.jsx           // Handles Paystack/Flutterwave integration
│   │   ├── QuizComponent.jsx          // Interactive student quiz and state management
│   │   ├── WorkshopCalendar.jsx       // Fetches and manages workshop sign-ups
│   │   └── Layout.jsx                 // Global components (Header, Footer, Navigation)
│   ├── App.js                         // Main application component, assembles all features
│   ├── index.js                       // Renders the main App component
│   └── styles/
│       └── App.css                    // Global styles
└── package.json                       // Project dependencies and scripts
▶️ Getting Started
Follow these steps to set up and run the project locally for development:

Prerequisites
You must have Node.js and npm installed on your system.

Installation
Clone the Repository:
git clone ymlab8-bogoso
cd ymlab8-bogoso
Install Dependencies:
npm install
Start the Development Server:
npm start
The site will open in your browser at http://localhost:3000. Changes made to the code will refresh automatically.
🛠️ API & Mock Data Management
The components currently utilize mock data within their respective files (e.g., fetchQuizQuestions, initiatePaystackPayment).


Deploy: Upload the contents of the generated build folder to a static hosting service like Netlify, Vercel, or GitHub Pages. These services are highly recommended for optimal performance and simple continuous deployment.

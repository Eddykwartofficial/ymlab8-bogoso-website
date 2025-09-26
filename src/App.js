/**
 * Yamoransa Model Lab 8 - Bogoso
 * app.js - Frontend Logic, State Management Mock, and API Placeholders
 */

// --- Global State Management Mock (Simple JS Object) ---
// This simple object simulates the global state that would be handled by React Context or Vuex
const state = {
    workshops: [],
    quizzes: [],
    userRole: 'visitor', // Can be 'student', 'teacher', or 'admin'
    isLoggedIn: false,
};

// --- MOCK API DATA (Replace with actual API calls to Headless CMS / Database) ---
const mockQuizData = [
    { id: 1, question: "What is the primary function of a flowchart in programming?", answer: "To visually represent the steps of an algorithm.", options: ["Store data", "Style a webpage", "Visually represent the steps of an algorithm", "Encrypt data"] },
    { id: 2, question: "Block-based coding primarily helps learners grasp:", answer: "Computational thinking without syntax errors.", options: ["Advanced Python", "Computational thinking without syntax errors", "Web deployment", "Assembly language"] }
];

const mockWorkshopData = [
    { id: 1, title: "Simple Methodology Training", date: "Oct 12, 2024", slots: 15, location: "Conference Room" },
    { id: 2, title: "Advanced Robotics Workshop", date: "Nov 5, 2024", slots: 25, location: "MakerSpace" }
];


// --- CORE FUNCTIONS ---

// Function to simulate fetching dynamic content from a Headless CMS (News/Gallery)
function fetchDynamicContent() {
    // In a real application, this fetches data from an API endpoint (e.g., /api/workshops)
    state.workshops = mockWorkshopData;
    state.quizzes = mockQuizData;

    renderWorkshopCalendar();
    // Simulate rendering the gallery and news
    console.log("Content fetched: Ready to render Gallery and News from CMS API.");
}

// Renders the workshop data into the Learning Centre section
function renderWorkshopCalendar() {
    const calendarEl = document.getElementById('workshop-calendar-placeholder');
    if (!calendarEl) return;

    if (state.workshops.length === 0) {
        calendarEl.innerHTML = "<p>No upcoming workshops are scheduled at this time. Check back soon!</p>";
        return;
    }

    let html = '<h3>Upcoming Workshops:</h3><ul>';
    state.workshops.forEach(workshop => {
        html += `<li>**${workshop.title}** - ${workshop.date} (${workshop.slots} slots left)</li>`;
    });
    html += '</ul>';

    calendarEl.innerHTML = html;
}

// Function to handle the Donation Form submission (API Integration Mock)
function handleDonationSubmit(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;

    if (amount < 10) {
        alert("Please enter a donation amount of GHC 10 or more.");
        return;
    }

    // --- PAYSTACK/FLUTTERWAVE API INTEGRATION POINT ---
    // In a production app, this would call a backend function which securely initiates payment.
    console.log(`Donation initiated: GHC ${amount}. Calling Payment Gateway API...`);

    // Mock the secure initiation and redirect to payment portal
    alert(`Successfully initiated GHC ${amount} donation. You would now be redirected to the secure payment portal (Paystack/Flutterwave).`);
}

// Function to handle the Workshop Sign-up (API Integration Mock)
function handleWorkshopSignup() {
    const selectedWorkshop = prompt("Enter the ID of the workshop you want to sign up for (e.g., 1 or 2):");
    const workshop = state.workshops.find(w => w.id == selectedWorkshop);

    if (workshop) {
        // --- BOOKING SYSTEM API INTEGRATION POINT ---
        // In a production app, this would send data to a booking management API.
        console.log(`Signing up for: ${workshop.title}. Calling Booking API...`);
        alert(`Successfully signed up for ${workshop.title} on ${workshop.date}!`);
    } else {
        alert("Invalid workshop ID or workshop not found. Please check the list.");
    }
}

// Function to handle the Quiz Feature
function startQuiz() {
    if (state.quizzes.length === 0) {
        alert("Quiz content is currently unavailable. Please check back later.");
        return;
    }

    let score = 0;
    alert("Starting Robotics Fundamentals Quiz. Good luck!");

    // Simple loop to simulate quiz flow using the mock data
    state.quizzes.forEach((q, index) => {
        const userAnswer = prompt(`Question ${index + 1}: ${q.question}\nOptions: ${q.options.join(', ')}\nEnter your full answer:`);
        
        if (userAnswer && userAnswer.toLowerCase().includes(q.answer.toLowerCase().substring(0, 10))) {
            score++;
            alert("Correct!");
        } else {
            alert(`Incorrect. The correct answer is: ${q.answer}`);
        }
    });

    alert(`Quiz Complete! Your final score is: ${score} out of ${state.quizzes.length}.`);
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    fetchDynamicContent(); // Load workshops and quiz data

    // Event Listeners for Key Features
    const donateForm = document.getElementById('donation-form');
    if (donateForm) {
        donateForm.addEventListener('submit', handleDonationSubmit);
    }

    const startQuizBtn = document.getElementById('start-quiz-btn');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }
    
    const workshopSignupBtn = document.getElementById('workshop-signup-btn');
    if (workshopSignupBtn) {
        workshopSignupBtn.addEventListener('click', handleWorkshopSignup);
    }

    // Basic Mobile Menu Toggle (Functionality for the menu-toggle button)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});
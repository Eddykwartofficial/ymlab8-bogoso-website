import React, { useState, useEffect } from 'react';
import './QuizComponent.css'; // Assume this file contains Tailwind CSS classes or regular CSS

// --- 1. MOCK API DATA FETCH ---
// In a real application, this function would use 'fetch' to get data from your Strapi CMS or a dedicated Quiz API.
const fetchQuizQuestions = async (topic = 'robotics_fundamentals') => {
    console.log(`Fetching quiz for: ${topic} from API...`);
    
    // Simulate API delay and data structure
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Which element of a robot corresponds to the human brain?", options: ["Motor", "Sensor", "Controller", "Actuator"], correct_answer: "Controller" },
                { id: 2, text: "In block-based coding (e.g., Scratch), what is a 'Loop' used for?", options: ["Changing colors", "Running code once", "Repeating a set of instructions", "Defining a variable"], correct_answer: "Repeating a set of instructions" },
                { id: 3, text: "The 'simple methodology' for teaching programming often starts with:", options: ["Assembly Language", "Flowchart Diagrams", "Advanced Python", "Neural Networks"], correct_answer: "Flowchart Diagrams" },
            ]);
        }, 500);
    });
};


// --- 2. THE REACT COMPONENT (State Management in Action) ---
const QuizComponent = () => {
    // State to manage the quiz lifecycle
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect Hook: Used to fetch data when the component mounts (API Integration)
    useEffect(() => {
        fetchQuizQuestions()
            .then(data => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to load quiz data:", error);
                setIsLoading(false);
            });
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    // Function to handle answer submission
    const handleAnswerSubmit = () => {
        if (selectedOption === null) {
            alert("Please select an option before submitting.");
            return;
        }

        // Check if the selected answer is correct
        if (selectedOption === currentQuestion.correct_answer) {
            setScore(prevScore => prevScore + 1); // Update score in state
        }

        // Move to the next question or complete the quiz
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedOption(null); // Reset selection for the next question
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
        setSelectedOption(null);
    };

    // --- 3. RENDERING THE UI ---
    if (isLoading) {
        return <div className="loading-state">Loading Robotics Quiz...</div>;
    }

    if (quizCompleted) {
        return (
            <div className="quiz-container completed">
                <h2>Quiz Complete! 🎉</h2>
                <p>Your score: **{score} out of {questions.length}**</p>
                <p>Great work in mastering **Robotics and Programming Fundamentals**!</p>
                <button className="btn-primary" onClick={restartQuiz}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
            <h4>{currentQuestion.text}</h4>

            <div className="options-grid">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => setSelectedOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <button
                className="btn-secondary"
                onClick={handleAnswerSubmit}
                disabled={selectedOption === null}
            >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>

            <p className="progress-info">Current Score: {score}</p>
        </div>
    );
};

export default QuizComponent;
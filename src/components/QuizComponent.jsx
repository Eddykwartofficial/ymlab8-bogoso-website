import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';

const QuizComponent = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer effect
  useEffect(() => {
    if (showResult || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showResult, isTimeUp]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
    setIsTimeUp(false);
  }, [currentQuestion]);

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || isTimeUp) return;
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === quizData[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([
      ...answers,
      {
        question: currentQuestion,
        selected: answerIndex,
        correct: quizData[currentQuestion].correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsTimeUp(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimeLeft(30);
    setIsTimeUp(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return { text: 'Outstanding!', color: 'text-green-600' };
    if (percentage >= 60) return { text: 'Great Job!', color: 'text-blue-600' };
    if (percentage >= 40) return { text: 'Good Effort!', color: 'text-yellow-600' };
    return { text: 'Keep Learning!', color: 'text-orange-600' };
  };

  if (!quizData || quizData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No quiz questions available.</p>
      </div>
    );
  }

  if (showResult) {
    const { text, color } = getScoreMessage();
    const percentage = Math.round((score / quizData.length) * 100);

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
          <h2 className={`text-3xl font-bold ${color} mb-4`}>{text}</h2>
          <div className="text-6xl font-bold text-gray-800 mb-4">{percentage}%</div>
          <p className="text-xl text-gray-600 mb-8">
            You scored {score} out of {quizData.length} questions
          </p>

          {/* Answer Review */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Answers</h3>
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    answer.isCorrect
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">
                        Question {index + 1}: {quizData[index].question}
                      </p>
                      <p className="text-sm text-gray-600">
                        Your answer: {quizData[index].options[answer.selected]}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-sm text-green-700 mt-1">
                          Correct answer: {quizData[index].options[answer.correct]}
                        </p>
                      )}
                    </div>
                    {answer.isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center btn-primary"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/learning-center'}
              className="btn-secondary"
            >
              Back to Learning Center
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          <span
            className={`text-sm font-semibold ${
              timeLeft <= 10 ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            ⏱️ {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-ymlab-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showFeedback = selectedAnswer !== null;

            let buttonClass = 'w-full text-left p-4 border-2 rounded-lg transition-all ';

            if (showFeedback) {
              if (isSelected && isCorrect) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50 text-red-800';
              } else if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else {
                buttonClass += 'border-gray-300 bg-gray-50 text-gray-600';
              }
            } else {
              buttonClass +=
                'border-gray-300 hover:border-ymlab-blue hover:bg-blue-50 text-gray-800';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null || isTimeUp}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showFeedback && isSelected && (
                    isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )
                  )}
                  {showFeedback && !isSelected && isCorrect && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score} / {currentQuestion + (selectedAnswer !== null ? 1 : 0)}
        </div>
        {selectedAnswer !== null && (
          <button onClick={handleNextQuestion} className="btn-primary">
            {currentQuestion < quizData.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;

// Sample quiz data structure
export const sampleQuizData = [
  {
    question: "What is the primary programming language used with Arduino?",
    options: ["Python", "C/C++", "JavaScript", "Java"],
    correctAnswer: 1,
  },
  {
    question: "Which visual programming language is best for beginners?",
    options: ["Python", "Scratch", "Ruby", "PHP"],
    correctAnswer: 1,
  },
  {
    question: "What does STEM stand for?",
    options: [
      "Science, Technology, Education, Math",
      "Science, Technology, Engineering, Mathematics",
      "Study, Technology, Engineering, Medicine",
      "Systems, Testing, Engineering, Methods"
    ],
    correctAnswer: 1,
  },
];
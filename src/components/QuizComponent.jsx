import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';

const QuizComponent = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === quizData[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([
      ...answers,
      {
        question: currentQuestion,
        selected: answerIndex,
        correct: quizData[currentQuestion].correct,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
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
  };

  if (!quizData || quizData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No quiz questions available.</p>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
          <h2 className={`text-3xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-orange-600'}`}>
            {passed ? 'Great Job!' : 'Keep Learning!'}
          </h2>
          <div className="text-6xl font-bold text-gray-800 mb-4">{percentage}%</div>
          <p className="text-xl text-gray-600 mb-8">
            You scored {score} out of {quizData.length} questions
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
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
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
            const isCorrect = index === question.correct;
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
              buttonClass += 'border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-800';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
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
          <button 
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < quizData.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
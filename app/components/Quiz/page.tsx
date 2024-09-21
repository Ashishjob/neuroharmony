import React, { useState } from 'react';

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    "Do you find it difficult to focus on tasks?",
    "Do you prefer routine and predictability?",
    "Do you find social interactions challenging?",
    "Do you have intense interests in specific topics?",
    "Do you experience sensory sensitivities?"
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div>
      <h1>The Quiz</h1>
      <input
        title='progress'
        type="range"
        min="0"
        max="100"
        value={progress}
        readOnly
        className='w-full'
      />
      <div>
        <p>{questions[currentQuestion]}</p>
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
"use client";
import React, { useState } from 'react';
import './QuizPage.css'; // Import the CSS file

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(-1)); // Initialize with -1 to indicate unanswered questions

  const questions = [
    "Do you find it difficult to focus on tasks?",
    "Do you prefer routine and predictability?",
    "Do you find social interactions challenging?",
    "Do you have intense interests in specific topics?",
    "Do you experience sensory sensitivities?",
    "Do you find it hard to understand social cues?",
    "Do you often feel overwhelmed in busy environments?",
    "Do you have a strong preference for specific textures or fabrics?",
    "Do you find it difficult to switch between tasks?",
    "Do you have a tendency to hyperfocus on certain activities?",
    "Do you find it challenging to make eye contact?",
    "Do you have a strong aversion to certain sounds or lights?",
    "Do you find it difficult to express your emotions?",
    "Do you have a need for a structured daily routine?",
    "Do you find it hard to understand jokes or sarcasm?",
    "Do you have repetitive behaviors or rituals?",
    "Do you find it difficult to adapt to changes?",
    "Do you have a strong interest in numbers, patterns, or statistics?",
    "Do you find it challenging to work in a team?",
    "Do you have a strong preference for solitude?"
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && answers[currentQuestion] !== -1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = parseInt(event.target.value);
    setAnswers(updatedAnswers);
  };

  const progress = (currentQuestion / (questions.length - 1)) * 100;

  const progressBarStyle = {
    background: `linear-gradient(90deg, 
      #ff9a9e ${progress}%, 
      #ffffff ${progress}%)`
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Neurodivergent Quiz</h1>
      <input
        title='progress'
        type="range"
        min="0"
        max="100"
        value={progress}
        readOnly
        className='w-full h-4 mb-4 transition-all duration-500 ease-in-out pastel-rainbow'
        style={progressBarStyle}
      />
      <div className="text-center">
        <p className="mb-4">{questions[currentQuestion]}</p>
        <div className="mb-4 flex justify-center space-x-4">
          <label className="block">
            <input
              type="radio"
              name="answer"
              value="1"
              checked={answers[currentQuestion] === 1}
              onChange={handleAnswerChange}
            />
            Very Often
          </label>
          <label className="block">
            <input
              type="radio"
              name="answer"
              value="2"
              checked={answers[currentQuestion] === 2}
              onChange={handleAnswerChange}
            />
            Often
          </label>
          <label className="block">
            <input
              type="radio"
              name="answer"
              value="3"
              checked={answers[currentQuestion] === 3}
              onChange={handleAnswerChange}
            />
            Sometimes
          </label>
          <label className="block">
            <input
              type="radio"
              name="answer"
              value="4"
              checked={answers[currentQuestion] === 4}
              onChange={handleAnswerChange}
            />
            Rarely
          </label>
          <label className="block">
            <input
              type="radio"
              name="answer"
              value="5"
              checked={answers[currentQuestion] === 5}
              onChange={handleAnswerChange}
            />
            Never
          </label>
        </div>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handlePreviousQuestion} 
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={handleNextQuestion} 
            disabled={currentQuestion === questions.length - 1 || answers[currentQuestion] === -1}
            className="px-4 py-2 bg-blue-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
"use client";
import { useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";
import "./QuizPage.css"; // Import the CSS file
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const QuizPage: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
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
    "Do you have a strong preference for solitude?",
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

  const handleRedirect = () => {
    router.push('/dashboard/matching'); // Change to your desired path
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = parseInt(event.target.value);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.name, // Replace with actual user ID
          answers: answers,
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to submit answers');
      } else {
        console.log('Answers submitted successfully');
        handleRedirect()
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };
  

  const progress = (currentQuestion / (questions.length - 1)) * 100;

  const progressBarStyle = {
    background: `linear-gradient(90deg, 
      #ff9a9e ${progress}%, 
      #ffffff ${progress}%)`,
  };

  return (
    <>
    {user ? (
    <div
      className="p-4 h-screen"
      style={{
        backgroundImage: "url('/assets/banner/quiz-background.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="p-2 rounded-lg">
        <h1 className="text-4xl mb-4">The Quiz</h1>
        <input
          title="progress"
          type="range"
          min="0"
          max="100"
          value={progress}
          readOnly
          className="w-full h-4 mb-4 transition-all duration-500 ease-in-out pastel-rainbow"
          style={progressBarStyle}
        />
      </div>
      <div className="flex flex-row justify-center w-full mt-16 rounded-xl">
        <div className="text-center bg-white rounded-xl w-3/5 px-24 py-24">
          <p className="mb-4 items-center text-3xl mt-24">
            {questions[currentQuestion]}
          </p>
          <div className="mb-4 flex flex-row justify-center space-x-4 items-center">
            <label className="flex flex-row block items-center">
              <span className="mr-4">Never</span>
              <label
                className="styled-big-radio-l items-center hover:cursor-pointer"
                htmlFor="answer1"
              >
                <input
                  id="answer1"
                  type="radio"
                  name="answer"
                  value="1"
                  checked={answers[currentQuestion] === 1}
                  onChange={handleAnswerChange}
                />
                <span></span>
              </label>
            </label>
            <label
              className="styled-medium-radio-l items-center hover:cursor-pointer"
              htmlFor="answer2"
            >
              <input
                id="answer2"
                type="radio"
                name="answer"
                value="2"
                checked={answers[currentQuestion] === 2}
                onChange={handleAnswerChange}
              />
              <span></span>
            </label>
            <label
              className="styled-small-radio items-center hover:cursor-pointer"
              htmlFor="answer3"
            >
              <input
                id="answer3"
                type="radio"
                name="answer"
                value="3"
                checked={answers[currentQuestion] === 3}
                onChange={handleAnswerChange}
              />
              <span></span>
            </label>
            <label
              className="styled-medium-radio-r items-center hover:cursor-pointer"
              htmlFor="answer4"
            >
              <input
                id="answer4"
                type="radio"
                name="answer"
                value="4"
                checked={answers[currentQuestion] === 4}
                onChange={handleAnswerChange}
              />
              <span></span>
            </label>
            <label
              className="styled-big-radio-r items-center hover:cursor-pointer"
              htmlFor="answer5"
            >
              <input
                id="answer5"
                type="radio"
                name="answer"
                value="5"
                checked={answers[currentQuestion] === 5}
                onChange={handleAnswerChange}
              />
              <span></span>
            </label>
            <span className="ml-4">Always</span>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={
                currentQuestion === questions.length - 1 ||
                answers[currentQuestion] === -1
              }
              className="px-4 py-2 bg-blue-500 rounded disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
          </div>
           {currentQuestion === questions.length - 1 && (
          <button 
            onClick={handleSubmit} 
            className="mt-4 px-4 py-2 bg-green-500 rounded"
            disabled={Object.keys(answers).length < questions.length}
            
          >
            Submit Quiz
          </button>
        )}
        </div>
       
      </div>
    </div>) : (<div className='min-h-screen flex flex-row justify-center items-center w-full bg-[#EAD1CA]'> Log In or Sign Up to Take the Quiz!! </div>)}
    </>
  );
};

export default QuizPage;

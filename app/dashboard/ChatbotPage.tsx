"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Typewriter from 'typewriter-effect';

const genAI = new GoogleGenerativeAI("AIzaSyDQ0vproRqHpeSGnHVI-hxZTyZLnHRrN98");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const missionStatement =
  "Your mission is to help neurodivergent users practice and improve social skills by acting as their friend. Don't make super long responses";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingText({ text, delay = 50 }: { text: string, delay?: number }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setContent((prevContent) => prevContent + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, [text, delay]);

  return <span>{content}</span>;
}

const Chatbot: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    const updatedHistory: Message[] = [
      ...conversationHistory,
      { role: "user", content: message },
    ];
    setConversationHistory(updatedHistory);

    const prompt = [
      missionStatement,
      ...updatedHistory.map((msg) => `${msg.role}: ${msg.content}`),
    ].join("\n");

    try {
      const result = await model.generateContent(prompt);

      const assistantResponse =
        result.response.text() || "Sorry, I could not generate a response.";

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-[#EAD1CA] h-[100vh]"
    >
      {" "}
      <div className="p-6 bg-white rounded-lg shadow-lg w-1/2 -mt-12">
        <h1 className="text-xl font-semibold mb-4 text-left text-indigo-600">
          Welcome to Our Friendly AI ChatBot, Nuro
        </h1>
        <h3 className="text-base font-light mb-4 text-left text-indigo-600">
          Nuro is a friendly little buddy ready to listen to you and any
          questions you may have!!
        </h3>
        <div
          ref={chatWindowRef}
          className="chat-window h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg"
        >
          {conversationHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex items-start ${
                message.role === "user"
                  ? "flex justify-start flex-row-reverse text-right w-full items-center"
                  : "justify-start items-center"
              }`}
            >
              <img
                src={
                  message.role === "user"
                    ? "/assets/pfp.jpeg" // replace with the path to the user's profile picture
                    : "/assets/owl-pfp.webp" // replace with the path to the assistant's profile picture
                  }
                  alt={`${message.role} profile`}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === "user"
                      ? "mr-2 bg-pink-200 text-pink-800 text-right"
                      : "ml-2 bg-blue-200 text-blue-800"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <TypingText text={message.content} delay={50} />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-grow mr-2 p-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full p-3 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

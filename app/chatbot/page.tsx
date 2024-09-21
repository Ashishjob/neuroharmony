"use client";
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyDQ0vproRqHpeSGnHVI-hxZTyZLnHRrN98"); 
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const missionStatement = "Your mission is to help neurodivergent users practice and improve social skills by acting as their friend. Don't make super long responses";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    const updatedHistory: Message[] = [
      ...conversationHistory,
      { role: 'user', content: message }, 
    ];
    setConversationHistory(updatedHistory);

    const prompt = [missionStatement, ...updatedHistory.map(msg => `${msg.role}: ${msg.content}`)].join('\n');

    try {
      const result = await model.generateContent(prompt);

      const assistantResponse = result.response.text() || 'Sorry, I could not generate a response.';

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: 'assistant', content: assistantResponse }, 
      ]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput(''); 
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div className="chat-window">
        {conversationHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.role === 'user' ? 'You' : 'ChatBot'}: </strong>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;

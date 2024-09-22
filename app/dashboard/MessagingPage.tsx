// MessagingPage.tsx
import React, { useState } from 'react';

// Sample data
const users = [
  { 
    id: 1, 
    name: 'Jorell P.', 
    messages: [
      { sender: 'Jorell', message: 'Hello' },
      { sender: 'You', message: 'Hi, Jorell!' },
      { sender: 'Jorell', message: 'How are you?' },
      { sender: 'You', message: 'I\'m good, thanks for asking.' }
    ] 
  },
  { 
    id: 2, 
    name: 'Andrew D.', 
    messages: [
      { sender: 'Andrew', message: 'Hi' },
      { sender: 'You', message: 'Hello, Andrew!' },
      { sender: 'Andrew', message: 'What\'s up?' },
      { sender: 'You', message: 'Not much, just working.' }
    ] 
  },
  // Add more users as needed
];

function MessagingPage() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messageInput, setMessageInput] = useState('');

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = { sender: 'You', message: messageInput };
      setSelectedUser({
        ...selectedUser,
        messages: [...selectedUser.messages, newMessage]
      });
      setMessageInput('');
  
      // Add message to local storage
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      messages.push(newMessage);
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  };

  return (
    <div className='bg-[#EAD1CA] h-screen flex'>
      <div className='w-4/5 p-4 flex flex-col'>
        <h2 className='font-bold mb-4'>Conversation with {selectedUser.name}</h2>
        <div className='flex-grow overflow-auto'>
          {selectedUser.messages.map((message, index) => (
            <p key={index}><strong>{message.sender}:</strong> {message.message}</p>
          ))}
        </div>
        <div className='mt-4 flex'>
          <input 
            type='text' 
            value={messageInput} 
            onChange={(e) => setMessageInput(e.target.value)} 
            className='flex-grow border-2 border-gray-200 rounded p-2 mr-2'
          />
          <button onClick={sendMessage} className='bg-blue-500 text-black rounded-xl rounded p-2'>Send</button>
        </div>
      </div>
      <div className='w-1/5 border-l-2 border-gray-200'>
        {users.map((user) => (
          <button 
            key={user.id} 
            className={`w-full p-4 border-b border-black/50 ${selectedUser.id === user.id ? 'bg-white/20 text-purple' : ''}`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MessagingPage;
'use client';  // Indicates client-side rendering

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = {
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
};

interface ChatProps {
  currentUser: string;
  chatPartner: string;
}

let socket: Socket | undefined;

const Chat = ({ currentUser, chatPartner }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Establish socket connection
    socket = io('http://localhost:4000');  // Change this to your deployed server URL
    socket.emit('join', currentUser);

    // Fetch chat history from the API
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat?sender=${currentUser}&receiver=${chatPartner}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, [currentUser, chatPartner]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      // Send message to the server via the API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: currentUser,
          receiver: chatPartner,
          message: newMessage,
        }),
      });

      const data = await res.json();
      setMessages((prevMessages) => [...prevMessages, data]);  // Update UI immediately

      // Emit the new message to the socket
      socket?.emit('newMessage', data);

      setNewMessage('');  // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;

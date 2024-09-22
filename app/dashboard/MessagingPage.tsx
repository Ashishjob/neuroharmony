import React, { useState, useRef, useEffect } from "react";

const users = [
  {
    id: 1,
    name: "Jorell P.",
    avatar: "/assets/owl-pfp.webp",
    messages: [
      { sender: "Jorell", message: "Hello", timestamp: "10:00 AM" },
      { sender: "You", message: "Hi, Jorell!", timestamp: "10:01 AM" },
      { sender: "Jorell", message: "How are you?", timestamp: "10:02 AM" },
      {
        sender: "You",
        message: "I'm good, thanks for asking.",
        timestamp: "10:03 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Andrew D.",
    avatar: "/assets/pfp.jpeg",
    messages: [
      { sender: "Andrew", message: "Hi", timestamp: "11:00 AM" },
      { sender: "You", message: "Hello, Andrew!", timestamp: "11:01 AM" },
      { sender: "Andrew", message: "What's up?", timestamp: "11:02 AM" },
      {
        sender: "You",
        message: "Not much, just working.",
        timestamp: "11:03 AM",
      },
    ],
  },
];

function MessagingPage() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [selectedUser.messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        sender: "You",
        message: messageInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setSelectedUser({
        ...selectedUser,
        messages: [...selectedUser.messages, newMessage],
      });
      setMessageInput("");
    }
  };

  return (
    <div className="h-screen flex bg-[#EAD1CA]">
      {/* Sidebar */}

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-[#EAD1CA] p-4 flex items-center border-b border-gray-300">
          <img
            src={selectedUser.avatar}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <h2 className="font-bold text-xl">{selectedUser.name}</h2>
        </div>

        {/* Messages */}
        <div className="flex flex-row h-screen">
          <div className="flex-1 overflow-y-auto p-4 bg-[#EAD1CA]">
            {selectedUser.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "You"
                      ? "bg-white text-black"
                      : "bg-[#24affe]/50 text-black"
                  }`}
                >
                  <p>{message.message}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="w-1/4 bg-gray-200 border-l overflow-y-auto">
            {users.map((user) => (
              <button
                key={user.id}
                className={`w-full p-4 flex items-center hover:bg-gray-300 transition-colors ${
                  selectedUser.id === user.id ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{user.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="bg-gray-200 p-4 flex items-center">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-white border-2 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 rotate-90 bg-blue-500 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessagingPage;

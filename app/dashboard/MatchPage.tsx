"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MatchPage() {
  const [users, setUsers] = useState<{
    name: ReactNode;
    bio: ReactNode; profilePicture: string 
}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleMatch = () => {
    fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users[currentIndex])
    })
    .then(() => navigate('/dashboard/messaging')); // Use history.push instead of window.location.href
  };

  const handleDecline = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <img className="w-48 h-48 rounded-full object-cover" src={users[currentIndex]?.profilePicture} alt="Profile" />
      <h1 className="mt-4 text-2xl font-bold">{users[currentIndex]?.name}</h1>
      <p className="mt-2 text-center">{users[currentIndex]?.bio}</p>
      <div className="mt-4 flex w-full justify-center">
        <button className="m-2 p-2 bg-red text-white w-full rounded-xl" onClick={handleDecline}>Decline</button>
        <button className="m-2 p-2 bg-green text-white w-full rounded-xl" onClick={handleMatch}>Match</button>
      </div>
    </div>
  );
}

export default MatchPage;
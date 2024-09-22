"use client";
import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [profileData, setProfileData] = useState({ name: '', bio: '', score: '', tags: [], profilePicture: '' });

  useEffect(() => {
    // Fetch the profile data from a server or a local data source
    // This is just a placeholder, replace it with your actual fetch call
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setProfileData(data));
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <img className="w-48 h-48 rounded-full object-cover" src="/assets/pfp.jpeg" alt="Profile" />
      <h1 className="mt-4 text-2xl font-bold">{profileData.name}</h1>
      <p className="mt-2 text-center">{profileData.bio}</p>
      <div className="mt-2 flex flex-wrap justify-center">
        {profileData.tags.map((tag, index) => (
          <span key={index} className="m-1 p-1 bg-blue-200 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
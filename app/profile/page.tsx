"use client";
import React, { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  bio: string;
  age: string;
  interests: string;
  tags: string[];
  profilePicture: string;
}

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    age: '',
    interests: '',
    tags: [],
    profilePicture: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: '',
    interests: ''
  });

  useEffect(() => {
    // replace this
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setProfileData(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
  };



  return (
    <div className="flex flex-col items-center p-8 bg-[#EAD1CA] h-screen">
      <img className="w-48 h-48 rounded-full object-cover" src="/assets/pfp.jpeg" alt="Profile" />
      <h1 className="mt-4 text-2xl font-bold">{profileData.name}</h1>
      <p className="mt-2 text-center">{profileData.bio}</p>
      <div className="mt-2 flex flex-wrap justify-center">
        {profileData.tags.map((tag, index) => (
          <span key={index} className="m-1 p-1 bg-blue-200 rounded-full">{tag}</span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-sm">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="Interests (comma separated)"
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="mt-2 mx-auto w-full py-2 bg-blue-500 text-black rounded">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;

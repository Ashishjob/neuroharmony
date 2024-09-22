"use client";
import React, { useState, useEffect } from "react";
import {
  Camera,
  Edit2,
  MapPin,
  Briefcase,
  Calendar,
  Save,
  Upload,
} from "lucide-react";

interface ProfileData {
  name: string;
  bio: string;
  age: string;
  location: string;
  occupation: string;
  interests: string[];
  tags: string[];
  profilePicture: string;
  portfolioImage: string;
}

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    bio: "",
    age: "",
    location: "",
    occupation: "",
    interests: [],
    tags: [],
    profilePicture: "/assets/pfp.jpeg",
    portfolioImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    // Fetch profile data
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setProfileData((prevData) => ({
        ...prevData,
        interests: [...prevData.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfileData((prevData) => ({
      ...prevData,
      interests: prevData.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    console.log("Updated profile:", profileData);
    setIsEditing(false);
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          portfolioImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-[100vh] bg-[#EAD1CA] from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white object-cover"
            src={profileData.profilePicture}
            alt="Profile"
          />
          {isEditing && (
            <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
              <Camera className="text-white" />
            </button>
          )}
        </div>

        <div className="pt-16 pb-8 px-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {profileData.name}
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center text-blue-500 hover:text-blue-600"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      name="age"
                      value={profileData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      className="w-1/2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      placeholder="Location"
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                  <input
                    type="text"
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleChange}
                    placeholder="Major"
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <p className="text-gray-600">{profileData.bio}</p>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {profileData.age} years old
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {profileData.occupation}
                  </div>
                </>
              )}

              <div>
                <h2 className="text-xl font-semibold mb-2">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-purple/20 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveInterest(interest)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add interest"
                        className="p-1 border rounded text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddInterest}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* ... (previous form fields remain unchanged) ... */}

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6 mt-4">
            <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
            {profileData.portfolioImage ? (
              <div className="relative">
                <img
                  src={profileData.portfolioImage}
                  alt="Portfolio"
                  className="w-full h-64 object-cover rounded-lg"
                />
                {isEditing && (
                  <button
                    onClick={() =>
                      setProfileData((prev) => ({
                        ...prev,
                        portfolioImage: "",
                      }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    &times;
                  </button>
                )}
              </div>
            ) : isEditing ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePortfolioUpload}
                  className="hidden"
                  id="portfolio-upload"
                />
                <label
                  htmlFor="portfolio-upload"
                  className="cursor-pointer flex flex-col items-center justify-center text-gray-600"
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Upload portfolio image</span>
                </label>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No portfolio image uploaded
              </p>
            )}
          </div>
        </div>
      </form>
      {isEditing && (
        <button
          type="submit"
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6 mt-4 mt-6 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-purple/20 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </button>
      )}
    </div>
  );
}

export default ProfilePage;

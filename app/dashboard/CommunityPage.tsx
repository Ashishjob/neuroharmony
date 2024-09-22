// CommunityPage.tsx
import React from 'react';

// Sample data
const communities = [
  { name: 'Rice University', school: '4 Members', photo: '/assets/banner/rice.jpeg' },
  { name: 'Houston, TX', school: '7 Members', photo: '/assets/banner/houston.jpeg' },
  { name: 'Computer Science', school: '2 Members', photo: '/assets/banner/cs.jpeg' },
  { name: 'Gaming', school: '3 Members', photo: '/assets/banner/gaming.webp' },
];

function CommunityPage() {
  return (
    <div className="flex flex-col bg-[#EAD1CA] h-[100vh]">
      <div className="flex flex-wrap w-full">
        {communities.map((community, index) => (
          <button 
            key={index} 
            className="m-6 bg-white rounded-xl w-1/4 h-56 p-6 rounded shadow-lg text-left flex flex-col"
            onClick={() => console.log(`Clicked on ${community.name}`)}
          >
            <img src={community.photo} alt={community.name} className="w-full text-left h-32 object-cover rounded-t-lg" />
            <div className="mt-4">
              <h2 className="font-bold">{community.name}</h2>
              <p>{community.school}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
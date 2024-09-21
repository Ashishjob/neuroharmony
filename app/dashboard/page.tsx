"use client";
import React from 'react';
import { BrowserRouter as Router, Route, Link, useLocation, Routes } from 'react-router-dom';
import ChatbotPage from './ChatbotPage';
import MatchPage from './MatchPage';
import MessagingPage from './MessagingPage';
import CommunityPage from './CommunityPage';
import ResourcesPage from './ResourcesPage';

function NavigationLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  return (
    <Link to={to} className={`py-4 pl-4 ${location.pathname === to ? 'bg-purple text-white' : ''}`}>
      {children}
    </Link>
  );
}

function Dashboard() {
  return (
    <Router>
      <div className="flex flex-col w-full h-screen">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/6 h-full text-xl border-r border-black">
            <NavigationLink to="/dashboard/community">Community</NavigationLink>
            <NavigationLink to="/dashboard/chatbot">Chatbot</NavigationLink>
            <NavigationLink to="/dashboard/matching">Matching</NavigationLink>
            <NavigationLink to="/dashboard/messaging">Messaging</NavigationLink>
            <NavigationLink to="/dashboard/resources">Resources</NavigationLink>
          </div>
          <div className="w-full">
            <Routes>
              <Route path="/dashboard/community" element={<CommunityPage />} />
              <Route path="/dashboard/chatbot" element={<ChatbotPage />} />
              <Route path="/dashboard/matching" element={<MatchPage />} />
              <Route path="/dashboard/messaging" element={<MessagingPage />} />
              <Route path="/dashboard/resources" element={<ResourcesPage />} />
              <Route path="*" element={<CommunityPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
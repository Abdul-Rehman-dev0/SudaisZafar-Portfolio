import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import WorksView from './views/WorksView';
import ContactView from './views/ContactView';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutView />;
      case 'works':
        return <WorksView />;
      case 'contact':
        return <ContactView />;
      case 'home':
      default:
        // 💡 UPDATE: Passing setPage function to HomeView
        return <HomeView setPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-20 md:pt-28 min-h-screen">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Sidebar Profile Card (Persistent) */}
          <div className="xl:sticky xl:top-28 xl:h-fit">
            {/* 💡 FIX: Passing the setPage function as onContactClick prop */}
            {/* We can also pass setPage here if ProfileCard has other navigation buttons */}
            <ProfileCard onContactClick={() => setCurrentPage('contact')} />
          </div>

          {/* Right Main Content (Scrollable) */}
          <div className="flex-1 min-w-0">
            <div className="text-white">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <footer className="py-6 mt-10 text-center text-gray-500 text-sm border-t border-gray-800/50">
        &copy; {new Date().getFullYear()} Sudais Zafar. All rights reserved.
      </footer>
    </>
  );
};

export default App;

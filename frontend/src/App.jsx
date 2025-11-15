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
        return <HomeView setPage={setCurrentPage} />;
    }
  };

  const isHomePage = currentPage === 'home';

  return (
    <>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-20 md:pt-28 min-h-screen">
        <div className="flex flex-col xl:flex-row gap-8">

          {/* 💡 1. Profile Card Rendering - TOP/STICKY */}
          {/* - XL screens par: Sticky sidebar (Hamesha dikhega)
            - Mobile/Tablet par: Content se pehle dikhega, 
              lekin sirf Home page par (isHomePage && block xl:block)
          */}
          <div 
              className={`
                  xl:sticky xl:top-28 xl:h-fit // Desktop Styles
                  ${!isHomePage ? 'hidden xl:block' : 'block mb-8 xl:mb-0'} // Conditional Visibility
              `}
          >
              <ProfileCard onContactClick={() => setCurrentPage('contact')} />
          </div>
          
          {/* ❌ REMOVED: Duplicate conditional rendering block for mobile home page. 
              Pehla block ab dono cases (sticky desktop aur top mobile home) ko handle karta hai. 
          */}

          {/* Right Main Content (Scrollable) */}
          <div className="flex-1 min-w-0">
            <div className="text-white">
              {renderContent()}
            </div>
          </div>
          
          {/* 💡 2. Profile Card Rendering - BOTTOM (For About, Works, Contact on Mobile) */}
          {/* Yeh block sirf tab dikhega jab:
            1. Screen XL se choti ho (Mobile/Tablet) AND
            2. Page Home na ho (!isHomePage)
          */}
          {!isHomePage && (
              <div className="block xl:hidden mt-8">
                  <ProfileCard onContactClick={() => setCurrentPage('contact')} />
              </div>
          )}
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
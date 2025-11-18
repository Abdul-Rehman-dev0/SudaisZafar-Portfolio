import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import WorksView from './views/WorksView';
import ContactView from './views/ContactView';

const getInitialPage = () => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage || 'home'; 
};


const App = () => {
    
    const [currentPage, setCurrentPage] = useState(getInitialPage);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

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
            {/* pt-20/md:pt-28: Yeh padding Navbar ki height ko compensate karta hai. */}
            <div className="max-w-7xl mx-auto p-4 md:p-8 pt-20 md:pt-28 min-h-screen">
                
                {/* Main Content Layout (Flex Row on XL) */}
                <div className="flex flex-col xl:flex-row gap-8">

                    {/* 💡 1. Profile Card (Desktop Sticky & Mobile Home Top) */}
                    <div 
                        className={`
                            // FIXED TOP VALUE: xl:top-20 ensure it sticks below Navbar
                            xl:sticky xl:top-20 xl:h-fit xl:w-96 // Desktop Sticky Styles
                            
                            // Conditional Visibility: Hamesha Home Page par dikhega (mobile/desktop dono)
                            // Aur baaki pages par sirf Desktop (xl:block) par sticky dikhega.
                            ${!isHomePage ? 'hidden xl:block' : 'block mb-8 xl:mb-0'} 
                        `}
                    >
                        <ProfileCard onContactClick={() => setCurrentPage('contact')} />
                    </div>
                    
                    {/* Right Main Content (Scrollable) */}
                    {/* XL Screens par, yeh content Profile Card ke side mein aayega. */}
                    <div className="flex-1 min-w-0">
                        <div className="text-white">
                            {renderContent()}
                        </div>
                    </div>
                    
                    {/* 💡 2. Profile Card (Mobile Bottom for Subpages) */}
                    {/* Yeh block sirf tab dikhega jab Mobile/Tablet ho AND Page Home na ho */}
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
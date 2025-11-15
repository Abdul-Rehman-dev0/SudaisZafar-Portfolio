import React, { useState } from 'react';

// --- 0.5. Toast Notification Component (Isse pehle define karna zaroori hai) ---
const ToastNotification = ({ show, message }) => {
    // Tailwind classes for the notification
    const baseClasses = `
        fixed bottom-20 left-1/2 transform -translate-x-1/2 
        p-3 rounded-lg shadow-xl 
        text-white transition-opacity duration-300 z-[9999] 
        ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        bg-cyan-600
    `;

    // Hum element ko sirf tabhi render karenge jab woh visible ho
    if (!show) return null; 

    return (
        <div className={baseClasses}>
            {message}
        </div>
    );
};

// --- 0. Utility Components (Defined Locally) ---

// 1. Utility Icon Component (For mobile menu/other icons)
export const Icon = ({ path, className = 'w-6 h-6' }) => (
    <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
);

// 2. Logo Icon Component (Original SVG code - used only on Desktop)
export const LogoIcon = ({ className = 'w-6 h-6' }) => { 
    // ... (LogoIcon ka code wahi rakhein) ...
    const gradientId = "paint0_linear_23_495";
    
    return (
        <svg 
            className={className}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 38 38" 
            fill="none"
        >
            
            <rect width="38" height="37.2567" rx="6" fill={`url(#${gradientId})`} />
            
            <path d="M17.005 26.5L14.505 25L12.505 26.5V29L13.005 31L15.005 32C16.5599 32.6206 17.4343 32.0494 19.005 31C21.8811 29.3976 23.4482 28.486 25.005 26.5V17C24.7286 16.1371 24.2274 15.7094 23.005 15C22.1461 14.6007 21.5839 14.6514 20.505 15L17.005 17V13L20.505 11V12L23.005 13.5L25.505 12V8C25.7185 7.33606 24.3848 6.49707 22.0056 5.00034L22.005 5C19.1308 6.08927 18.1609 6.79941 16.005 8C13.4364 9.48988 12.6144 10.5615 12.505 13V19C12.4338 20.0029 12.4334 20.5611 13.005 21.5L15.005 22.5H17.005L20.505 20.5V24.5L17.005 26.5Z" fill="#171B22" />
            
            <defs>
                <linearGradient id={gradientId} x1="19" y1="0" x2="19" y2="37.2567" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"/>
                    <stop offset="1" stop-color="#929292"/>
                </linearGradient>
            </defs>
        </svg>
    );
};

// --- 1. Reusable Button Component ---
const ActionButton = ({ onClick, href, download, text, className = '' }) => {
    // Common Tailwind classes for the button style
    const commonClasses = `
        px-4 py-2 text-sm font-semibold text-cyan-400 
        border border-cyan-700 
        hover:bg-cyan-700 
        hover:text-white
        transition duration-300 ease-in-out
        rounded-lg
    `;

    // Agar href hai, toh <a> tag return karein aur uspar onClick daal dein
    if (href) {
        return (
            <a 
                href={href} 
                download={download} 
                className={`${commonClasses} ${className}`}
                role="button" 
                onClick={onClick} // 💡 onClick yahan add kiya hai
            >
                <span>{text}</span>
            </a>
        );
    }

    // Agar href nahi hai, toh <button> tag return karein
    return (
        <button 
            onClick={onClick} 
            className={`${commonClasses} ${className}`}
        >
            {text}
        </button>
    );
};

// --- 2. Navbar Component ---
const Navbar = ({ currentPage, setPage }) => { 
    const navItems = ['Home', 'About', 'Works', 'Contact'];
    const [isDownloading, setIsDownloading] = useState(false); 

    const handleDownloadClick = () => {
        setIsDownloading(true);
        
        // 3 seconds baad toast ko hata dein
        setTimeout(() => {
            setIsDownloading(false);
        }, 3000); 

        // Return undefined or null to let the <a> tag handle the navigation/download
        return; 
    };

    const navIcons = {
        home: 'M3 12L12 3L21 12H17V20H7V12H3Z', 
        about: 'M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z', 
        works: 'M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z', 
        contact: 'M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 6L12 11L4 6H20Z', 
    };

    const NavLink = ({ name }) => {
        // ... (NavLink ka code wahi rakhein) ...
        const isActive = currentPage === name.toLowerCase();
        const activeStyle = 'text-white border-b-2 border-cyan-400 font-semibold';
        const inactiveStyle = 'text-gray-400 hover:text-white transition duration-200';
    
        return (
            <button
                onClick={() => setPage(name.toLowerCase())}
                className={`px-3 py-2 text-sm md:text-base ${isActive ? activeStyle : inactiveStyle}`}
            >
                {name}
            </button>
        );
    };

    const MobileNavLink = ({ name }) => {
        // ... (MobileNavLink ka code wahi rakhein) ...
        const pageKey = name.toLowerCase();
        const isActive = currentPage === pageKey;
        const activeStyle = 'text-cyan-400';
        const inactiveStyle = 'text-gray-400 hover:text-cyan-400 transition duration-200';
    
        return (
            <button
                onClick={() => setPage(pageKey)}
                className={`flex flex-col items-center justify-center p-2 flex-1 ${isActive ? activeStyle : inactiveStyle}`}
                aria-label={`Go to ${name} section`}
            >
                <Icon path={navIcons[pageKey]} className="w-6 h-6"/>
            </button>
        );
    };

    return (
        <>
            {/* 💡 Toast Notification Component Call */}
            <ToastNotification 
                show={isDownloading} 
                message="✅ CV Download started." 
            />

            {/* 💻 Desktop Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-[#0A1019]/95 backdrop-blur-md shadow-2xl shadow-black/50 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo and Name */}
                    <div className="flex items-center space-x-2 text-white text-3xl font-fancy">
                        <LogoIcon className="w-8 h-8"/> 
                        <span>Sudais Zafar</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="flex items-center space-x-6">
                        {navItems.map(item => <NavLink key={item} name={item} />)}
                    </div>

                    {/* Action Button (Download CV) */}
                    <div className="flex items-center space-x-3">
                        <ActionButton 
                            href="/Sudais_Zafar_CV.pdf" 
                            download="Sudais_Zafar_CV.pdf" 
                            text="Download CV"
                            onClick={handleDownloadClick}
                        />
                    </div>
                </div>
            </nav>

            {/* 📱 Mobile Top Bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 p-4 bg-[#0A1019]/95 backdrop-blur-md shadow-2xl shadow-black/50 md:hidden">
                <div className="flex justify-between items-center"> 
                    {/* Name ONLY for mobile */}
                    <div className="flex items-center text-white text-2xl font-fancy font-semibold"> 
                        <span>Sudais Zafar</span> 
                    </div>
                    
                    {/* MOBILE CV DOWNLOAD BUTTON */}
                    <ActionButton 
                        href="/Sudais_Zafar_CV.pdf" 
                        download="Sudais_Zafar_CV.pdf" 
                        text="Get CV" 
                        onClick={handleDownloadClick} 
                        className="text-sm py-1.5 px-3 whitespace-nowrap"
                    />
                </div>
            </nav>

            {/* 📱 Mobile Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A1019] border-t border-cyan-700/50 shadow-inner shadow-black/50">
                <div className="flex justify-around items-center h-14">
                    {navItems.map(item => <MobileNavLink key={item} name={item} />)}
                </div>
            </div>
        </>
    );
};

export default Navbar;
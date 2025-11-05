import React from 'react';
import { Icon, LogoIcon } from './UtilityComponents';

// Reusable Button Component (Icon Removed and Font Weight Increased)
const ActionButton = ({ onClick, href, download, text, className = '' }) => {
  // 💡 Updated commonClasses: Font weight is set to 'semibold', no icon specific padding/margin
  const commonClasses = `
    px-4 py-2 text-sm font-semibold text-cyan-400 
    border border-cyan-700 
    hover:bg-cyan-700 
    hover:text-white
    transition duration-300 ease-in-out
  `;

  if (href) {
    return (
      <a 
        href={href} 
        download={download} 
        className={`${commonClasses} ${className}`}
        role="button" 
      >
        <span>{text}</span>
        {/* Icon removed completely */}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={`${commonClasses} ${className}`}
    >
      {text}
    </button>
  );
};

const Navbar = ({ currentPage, setPage }) => { 
  const navItems = ['Home', 'About', 'Works', 'Contact'];

  const NavLink = ({ name }) => {
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-[#0A1019]/95 backdrop-blur-md shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Name - Font size increased to 3xl */}
        <div className="flex items-center space-x-2 text-white text-3xl font-fancy">
          <LogoIcon className="w-6 h-6"/>
          <span>Sudais Zafar</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(item => <NavLink key={item} name={item} />)}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Download CV Button using new component */}
          <ActionButton 
            href="/Sudais_Zafar_CV.pdf" 
            download="Sudais_Zafar_CV.pdf" 
            text="Download CV"
          />
        </div>

        {/* Mobile Menu Icon (Placeholder for dropdown if needed) */}
        <div className="md:hidden">
          <button className="text-white">
            <Icon path="M3 12H21M3 6H21M3 18H21" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

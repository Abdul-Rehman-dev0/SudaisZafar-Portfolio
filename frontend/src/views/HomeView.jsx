import React, { useState, useEffect } from 'react';
// Icon component sirf SVG paths handle karega, jaisa pehle tha
// NOTE: I am assuming these utility components and data are correctly imported from the parent App structure.
import { ModernCard, Icon, LogoIcon, LinkIcon } from '../components/UtilityComponents';
import { profileData } from '../data';

// --- TypingAnimator Component (Updated for Stacking) ---
const phrases = ['Logo design', 'Landing Page', 'Mobile & Web Design', 'Prototyping'];

const TypingAnimator = () => {
  const [completedPhrases, setCompletedPhrases] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // If all phrases are complete, stop
    if (phraseIndex >= phrases.length) return;

    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (currentTypingText !== currentPhrase) {
      // 1. Typing character
      const nextText = currentPhrase.substring(0, currentTypingText.length + 1);

      timeout = setTimeout(() => {
        setCurrentTypingText(nextText);
      }, 120); // Typing speed

    } else {
      // 2. Finished typing the current phrase, pause, then move to the next line
      timeout = setTimeout(() => {
        // Add the completed phrase to the list
        setCompletedPhrases((prev) => [...prev, currentPhrase]);
        
        // Reset current typing text
        setCurrentTypingText(''); 
        
        // Move to the next phrase
        setPhraseIndex((prevIndex) => prevIndex + 1);
      }, 1000); // 1 second pause before starting next line
    }

    return () => clearTimeout(timeout);
  }, [currentTypingText, phraseIndex]);

  return (
    // min-h-[12rem] ensures the card height remains stable as text stacks
    <div className="my-4 min-h-[12rem] text-white"> 
      {/* Display completed phrases - each on a new line */}
      {completedPhrases.map((p, i) => (
        <div key={i} className="text-4xl font-serif font-light mb-1">{p}</div>
      ))}

      {/* Display currently typing phrase */}
      {phraseIndex < phrases.length && (
        <div className="text-4xl font-serif font-light">
          {currentTypingText}
          {/* Blinking Cursor */}
          <span className="inline-block w-0.5 h-10 bg-cyan-400 align-middle ml-1 animate-pulse"></span>
        </div>
      )}
    </div>
  );
};
// ---------------------------------


// 💡 setPage prop ko destructure kiya gaya hai
const HomeView = ({ setPage }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* 1. Main Title Card (Position Fixed - Row 1, Col 1) */}
    <ModernCard className="md:col-span-2 lg:col-span-1 flex flex-col justify-between animated-card-bg">
      <h3 className="text-sm text-gray-400 font-medium">{profileData.title}</h3>
      <h1 className="text-4xl font-extrabold text-white mt-2">
        {profileData.name}.
      </h1>
      <p className="text-gray-300 mt-4 text-sm">{profileData.bio.substring(0, 150)}...</p>
      {/* REMOVED: Icon button yahan se hata diya gaya hai */}
      <div className="mt-6 flex justify-end">
        {/* Yeh div ab khali hai */}
      </div>
    </ModernCard>

    {/* 2. Logo Design Card (Specialization - Row 1, Col 2 & 3) */}
    <ModernCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between animated-card-bg">
      <h2 className="text-xs tracking-widest text-gray-400 font-bold">SPECIALIZATION</h2>
      {/* TypingAnimator ab stacked lines return karega */}
      <TypingAnimator />
      <div className="flex justify-between items-center">
        <p className="text-xs text-cyan-400">Services Offering</p>
        {/* REMOVED: Icon button yahan se hata diya gaya hai */}
        <div className="flex justify-end mt-4">
          {/* Yeh div ab khali hai */}
        </div>
      </div>
    </ModernCard>
    
    {/* 3. Stats Cards (Row 2, spanning 3 columns in total) */}
    {profileData.stats.map((stat, index) => (
      <ModernCard 
        key={index} 
        // Gradient animation class added here
        className="flex flex-col justify-center items-center text-center animated-card-bg"
      >
        <h1 className="text-4xl font-extrabold text-cyan-400">{stat.count}</h1>
        <p className="text-xs text-gray-400 font-medium mt-2">{stat.label}</p>
      </ModernCard>
    ))}
    {/* -------------------------------------- */}

    {/* 💡 NEW: Credentials (4) and Projects (5) now wrapped in a single container spanning 3 columns,
        and using an internal 2-column grid for a 50/50 split on desktop. */}
    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 4. Credentials Card (Equal Width - 50%) - Click to About Page */}
        <ModernCard 
          onClick={() => setPage('about')} // 💡 Navigation added here
          className="flex flex-col justify-between cursor-pointer hover:shadow-cyan-500/50 hover:shadow-lg transition duration-300"
        >
          <h2 className="text-xs tracking-widest text-gray-400 font-bold">MORE ABOUT ME</h2>
          <div className="flex items-center space-x-2 my-4 text-white">
            <LogoIcon />
            <span className="text-xl font-semibold">Credentials</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-cyan-400">T WORK AND FEATURED</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setPage('about'); }} // 💡 Button click also navigates
              className="p-2 transition duration-200 hover:text-cyan-300 text-cyan-500" 
            >
              <Icon path="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="w-8 h-8" />
            </button>
          </div>
        </ModernCard>

        {/* 5. Projects Card (Equal Width - 50%) - Click to Works Page */}
        <ModernCard 
          onClick={() => setPage('works')} // 💡 Navigation added here
          className="flex flex-col justify-between cursor-pointer hover:shadow-cyan-500/50 hover:shadow-lg transition duration-300"
        >
          <h2 className="text-xs tracking-widest text-gray-400 font-bold">MY WORKS</h2>
          <h3 className="text-xl font-semibold text-white my-4">Showcase Projects</h3>
          <div className="flex justify-between items-center">
            <p className="text-xs text-cyan-400">+ LATEST WORK AND FEATURED</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setPage('works'); }} // 💡 Button click also navigates
              className="p-2 transition duration-200 hover:text-cyan-300 text-cyan-500"
            >
              <Icon path="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="w-8 h-8" />
            </button>
          </div>
        </ModernCard>
    </div>
    
    {/* 7. Let's Work Together Card (Final CTA - lg:col-span-3) */}
    <ModernCard className="lg:col-span-3 flex flex-col justify-between animated-card-bg">
      <div className="text-right">
        <span className="text-4xl text-cyan-400">☆</span>
        <span className="text-4xl text-cyan-400">☆</span>
      </div>
      <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
        Let's work <span className="text-indigo-400">together.</span>
      </h1>
      <div className="flex justify-end mt-4">
        <button 
          onClick={() => setPage('contact')} // Contact page navigation
          className="p-3 transition duration-200 hover:text-cyan-300 text-cyan-500"
        >
          <Icon path="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="w-10 h-10" />
        </button>
      </div>
    </ModernCard>
  </div>
);

export default HomeView;
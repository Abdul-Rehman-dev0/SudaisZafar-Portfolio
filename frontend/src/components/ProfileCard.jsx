import React from 'react';
import { ModernCard, Icon, LinkIcon } from './UtilityComponents';
import { profileData } from '../data';

// 💡 1. Profile picture import
import userImage from '../assets/profilepic.jpg'; 

// 💡 2. Saare custom PNG icons ka import
import emailPng from '../assets/gmail.png';
import linkedinPng from '../assets/linkedin.png';
import twitterPng from '../assets/twitter.png';
import instagramPng from '../assets/instagram.png';


// ProfileCard ab onContactClick prop accept karega
const ProfileCard = ({ onContactClick }) => {

  // PNG Icon render karne ke liye utility function
  const renderPngIcon = (src, alt) => (
    <img 
      src={src} 
      alt={alt} 
      className="w-5 h-5 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]" 
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/20x20/FF0000/ffffff?text=X"; }}
    />
  );

  return (
    // FINAL FIX: Sticky position set to xl:top-20 (5rem) which is larger than the Navbar height, 
    // ensuring it sticks *below* the fixed navbar and never overlaps.
    <div className="w-full xl:w-96 xl:sticky xl:top-20 xl:z-50"> 
        <ModernCard className="p-0 overflow-hidden relative">
          
          {/* Profile Background Blur/Gradient Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-indigo-900/60 to-transparent pointer-events-none"></div>

          <div className="p-4 pt-10 flex flex-col items-center">
            {/* Profile Image - max-w increased from [200px] to [280px] */}
            <div className="relative border-4 border-cyan-400/20 rounded-2xl w-full max-w-[280px] aspect-square overflow-hidden shadow-2xl">
              <img
                src={userImage} 
                alt="Sudais Zafar Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x500/1B2332/ffffff?text=Image+Load+Error"; }}
              />
            </div>

            {/* Text Color Fix: Added drop-shadow for better visibility (prominence) */}
            <h2 className="text-white text-2xl font-bold mt-6 drop-shadow-md">{profileData.name}</h2>
            <p className="text-white text-sm drop-shadow-sm">{profileData.handle}</p>

            {/* Social Icons (Original Color + White Drop-Shadow) */}
            <div className="flex space-x-4 my-6">
              
              {/* 1. Email Icon (PNG - email.png) */}
              <LinkIcon 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sudaiszafar04@gmail.com&su=Inquiry%20from%20Portfolio%20Website"
              > 
                <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                  {renderPngIcon(emailPng, "Email")}
                </div>
              </LinkIcon>
              
              {/* 2. LinkedIn Icon (PNG - linkedin.png) */}
              <LinkIcon href={profileData.linkedin || "https://www.linkedin.com/in/sudaiszafar2709?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"}>
                <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                  {renderPngIcon(linkedinPng, "LinkedIn")}
                </div>
              </LinkIcon>
              
              {/* 3. X (Twitter) Icon (PNG - twitter.png) */}
              <LinkIcon href={profileData.x || "https://x.com/sudaiszafar04?s=21"}>
                <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                  {renderPngIcon(twitterPng, "X (Twitter)")}
                </div>
              </LinkIcon>

              {/* 4. Instagram Icon (PNG - instagram.png) */}
              <LinkIcon href={profileData.instagram || "https://www.instagram.com/its_sudais_here?igsh=c2F5YnppMnFyYnNz&utm_source=qr"}>
                <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                  {renderPngIcon(instagramPng, "Instagram")}
                </div>
              </LinkIcon>
            </div>

            {/* Contact Me Button */}
            <button 
              onClick={onContactClick} 
              className="w-4/5 py-3 
              text-base 
              font-semibold 
              rounded-xl 
              
              /* Default State: SOLID BUTTON with a transparent border to maintain height */
              border-2 border-transparent 
              bg-cyan-600 
              text-white 
              shadow-lg shadow-cyan-800/80 
              
              /* Hover State: GHOST BUTTON (same border width but cyan color) */
              transition duration-300 transform 
              hover:bg-transparent hover:text-cyan-400 hover:border-cyan-400 
              hover:shadow-cyan-400/40 
              /* Centering text within button */
              flex justify-center items-center"> 
              Contact Me
            </button>
          </div>
        </ModernCard>
    </div>
  );
};

export default ProfileCard;
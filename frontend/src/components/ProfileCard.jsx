import React from 'react';
import { ModernCard, LinkIcon } from './UtilityComponents';
import { profileData } from '../data';

// Profile picture import
import userImage from '../assets/profilepic.jpg';

// Social Icons
import emailPng from '../assets/gmail.png';
import linkedinPng from '../assets/linkedin.png';
import twitterPng from '../assets/twitter.png';
import instagramPng from '../assets/instagram.png';

const ProfileCard = ({ onContactClick }) => {

  // PNG icon render helper
  const renderPngIcon = (src, alt) => (
    <img
      src={src}
      alt={alt}
      className="w-5 h-5 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
      onError={(e) => { 
        e.target.onerror = null; 
        e.target.src = "https://placehold.co/20x20/FF0000/ffffff?text=X"; 
      }}
    />
  );

  return (
    <div className="w-full xl:w-96 xl:sticky xl:top-20 xl:z-50">
      <ModernCard className="p-0 overflow-hidden relative">

        {/* Background Overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-indigo-900/60 to-transparent pointer-events-none"></div>

        <div className="p-4 pt-10 flex flex-col items-center">

          {/* Profile Image */}
          <div className="relative border-4 border-cyan-400/20 rounded-2xl w-full max-w-[280px] aspect-square overflow-hidden shadow-2xl">
            <img
              src={userImage}
              alt="Sudais Zafar Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/500x500/1B2332/ffffff?text=Image+Load+Error";
              }}
            />
          </div>

          {/* Name + Handle */}
          <h2 className="text-white text-2xl font-bold mt-6 drop-shadow-md">
            {profileData.name}
          </h2>
          <p className="text-white text-sm drop-shadow-sm">
            {profileData.handle}
          </p>

          {/* Social Icons (No change) */}
          <div className="flex space-x-4 my-6">

            <LinkIcon href="https://mail.google.com/mail/?view=cm&fs=1&to=sudaiszafar04@gmail.com&su=Inquiry">
              <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                {renderPngIcon(emailPng, "Email")}
              </div>
            </LinkIcon>

            <LinkIcon href={profileData.linkedin}>
              <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                {renderPngIcon(linkedinPng, "LinkedIn")}
              </div>
            </LinkIcon>

            <LinkIcon href={profileData.x}>
              <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                {renderPngIcon(twitterPng, "Twitter")}
              </div>
            </LinkIcon>

            <LinkIcon href={profileData.instagram}>
              <div className="p-3 rounded-full bg-indigo-900/60 hover:bg-cyan-700 transition duration-300">
                {renderPngIcon(instagramPng, "Instagram")}
              </div>
            </LinkIcon>

          </div>

          {/* ⭐ Final Contact Button (ORIGINAL CYAN DEFAULT, NO SHADOWS, GHOST HOVER) */}
          <button 
          onClick={onContactClick} 
          className="w-4/5 py-3 
          text-base 
          font-bold 
          drop-shadow-[0_0_1px_rgba(255,255,255,1)] /* Text prominence retained */
          rounded-xl 
          
          /* Default: Original Cyan Color, NO SHADOW */
          border-0
          bg-cyan-600 /* Original requested color */
          text-white 
          shadow-none 
          
          /* Hover: Ghost Button Effect, NO height/size change, NO shadows */
          transition duration-300 
          hover:bg-transparent hover:text-cyan-400 hover:border-cyan-400 hover:border-2 hover:shadow-none
          
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
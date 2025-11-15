import React from 'react';
import { profileData } from '../data';

// --- 1. Reusable Component: TimelineItem ---
// Component for Experience/Education items to give them a consistent card style
const TimelineItem = ({ dates, title, subtitle, details, isExperience = false }) => (
    <div className="relative pl-6 sm:pl-10 pb-8 group">
        {/* Vertical Timeline Line */}
        <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 bg-gray-700 group-last:h-1/2"></div>
        
        {/* Timeline Dot */}
        <div className="absolute left-0 sm:left-2.5 top-0 w-6 h-6 sm:w-8 sm:h-8 bg-gray-900 border-2 border-cyan-500 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping-slow"></span>
        </div>

        {/* Content Card */}
        <div className={`ml-4 p-5 rounded-xl transition duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 ${isExperience ? 'bg-gray-800/50' : 'bg-gray-800/30'} backdrop-blur-sm`}>
            <p className="text-sm text-cyan-400 font-medium mb-1 tracking-wider">{dates}</p>
            <h3 className="text-xl font-extrabold text-white">{title}</h3>
            <p className="text-gray-300 text-base font-semibold mt-1">{subtitle}</p>
            
            {/* Details (Only for Experience) */}
            {isExperience && (
                <ul className="list-disc list-outside ml-5 mt-3 text-sm text-gray-400 space-y-1">
                    {details && details.map((detail, dIndex) => (
                        <li key={dIndex}>{detail}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

// --- 2. Main View Component: AboutContent ---
const AboutContent = () => (
    // Main container has background and shadow styling
    <div className="space-y-12 text-white p-4 md:p-6 lg:p-8 bg-gray-900 rounded-xl shadow-2xl">
        
        {/* 1. About Me (Bio) */}
        <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight relative pb-3">
                <span className="text-white">A Little</span> 
                <span className="text-cyan-400 ml-2">About Me.</span>
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-500 rounded-full"></div>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-indigo-500 pl-4 bg-gray-800/30 p-4 rounded-lg shadow-inner">
                {profileData.bio}
            </p>
        </div>

        

        {/* 2. Experience (Timeline) */}
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight relative pb-3">
                <span className="text-white">Work</span> 
                <span className="text-indigo-400 ml-2">History.</span>
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-indigo-500 rounded-full"></div>
            </h2>
            <div className="relative">
                {profileData.experience.map((job, index) => (
                    <TimelineItem
                        key={index}
                        dates={job.dates}
                        title={job.role}
                        subtitle={job.company}
                        details={job.details}
                        isExperience={true}
                    />
                ))}
            </div>
        </div>

        

        {/* 3. Education (Timeline) */}
        <div className="space-y-6 pt-6">
            <h2 className="text-3xl font-bold tracking-tight relative pb-3">
                <span className="text-white">My</span> 
                <span className="text-green-400 ml-2">Credentials.</span>
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-green-500 rounded-full"></div>
                
            </h2>
            <div className="relative">
                {profileData.education.map((edu, index) => (
                    <TimelineItem
                        key={index}
                        dates={edu.dates}
                        title={edu.major}
                        subtitle={edu.institution}
                        isExperience={false} 
                    />
                ))}
            </div>
        </div>

        

        {/* 4. Skills (Pills) */}
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight relative pb-3">
                <span className="text-white">Technical</span> 
                <span className="text-pink-400 ml-2">Skills.</span>
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-pink-500 rounded-full"></div>
            </h2>
            <div className="flex flex-wrap gap-4 pt-2">
                {profileData.skills.map((skill, index) => (
                    <span 
                        key={index} 
                        // Enhanced pill design with subtle animation
                        className="px-5 py-2 text-sm font-medium bg-pink-700/60 text-white rounded-full 
                                   border border-pink-600 shadow-md shadow-pink-900/50 
                                   hover:bg-pink-600 transition duration-300 cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default AboutContent; // Use this name in your App.jsx import
import React from 'react';
import { ModernCard } from '../components/UtilityComponents';
import { profileData } from '../data';

// --- UPDATED ProjectCard Component with Image Fix (object-top) ---
const ProjectCard = ({ project }) => (
  <ModernCard className="space-y-4">
    {/* Project Image Section */}
    <div className="w-full h-40 bg-gray-800 rounded-xl overflow-hidden shadow-inner">
      <img
        src={project.imageUrl}
        alt={project.name}
        // FIX: Changed className from "w-full h-full object-cover" 
        // to "w-full h-full object-cover object-top"
        className="w-full h-full object-cover object-top" 
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x160/1B2332/ffffff?text=Project+Placeholder"; }}
      />
    </div>

    <h3 className="text-lg font-bold text-white">Project Name: {project.name}</h3>
    
    <p className="text-gray-400 text-xs leading-relaxed">
      Description: {project.description}
    </p>

    {/* Flex container for Software used and Button (Same Line) */}
    <div className="flex justify-between items-center pt-2">
      
      {/* Software Used Information (Left Side) */}
      <p className="text-cyan-400 text-sm font-medium">
        Software used: <span className="text-white">{project.software}</span>
      </p>

      {/* View Link (Right Side) - Minimalist Border Design */}
      {project.projectUrl && (
        <a 
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          // Minimalist Design classes retained
          className="text-sm font-semibold text-cyan-400 border border-cyan-400 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-cyan-400 hover:text-gray-900 flex items-center group whitespace-nowrap"
        >
          View 
          {/* Arrow Icon Size Adjusted */}
          <svg 
            className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      )}
    </div>

  </ModernCard>
);

const WorksView = () => (
  <div className="space-y-10">
    <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">MY WORKS</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {profileData.projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  </div>
);

export default WorksView;
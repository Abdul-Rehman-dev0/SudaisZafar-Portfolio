import React from 'react';
import { ModernCard } from '../components/UtilityComponents';
import { profileData } from '../data';

const ProjectCard = ({ project }) => (
  <ModernCard className="space-y-4">
    <div className="w-full h-40 bg-gray-800 rounded-xl overflow-hidden shadow-inner">
      <img
        src={project.imageUrl}
        alt={project.name}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x160/1B2332/ffffff?text=Project+Placeholder"; }}
      />
    </div>
    <h3 className="text-lg font-bold text-white">Project Name: {project.name}</h3>
    <p className="text-gray-400 text-xs leading-relaxed">
      Description: {project.description}
    </p>
    <p className="text-cyan-400 text-sm font-medium">
      Software used: <span className="text-white">{project.software}</span>
    </p>
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
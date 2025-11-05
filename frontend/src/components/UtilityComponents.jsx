import React from 'react';

// Reusable SVG Icon Component
export const Icon = ({ path, className = "w-6 h-6", onClick }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
    <path d={path} />
  </svg>
);

// Custom Logo Icon (The geometric one)
export const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 22V12L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7L12 12L2 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 12L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

// Anchor Link Wrapper
export const LinkIcon = ({ children, href, className, target = "_blank" }) => (
  <a href={href} target={target} rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

// Custom Card Component with the signature border/gradient (Glassmorphism effect)
export const ModernCard = ({ children, className = '' }) => (
  <div className={`
    relative p-6 rounded-3xl backdrop-blur-sm
    bg-gradient-to-br from-indigo-900/40 to-gray-900/40 
    shadow-lg overflow-hidden transition-all duration-300
    ${className}
  `}>
    {/* Inner Border/Glow Effect */}
    <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none"></div>
    {children}
  </div>
);
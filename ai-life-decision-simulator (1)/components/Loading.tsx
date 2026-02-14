import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 min-h-[50vh]">
      <div className="relative w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-500/30 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-accent-500 border-r-brand-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Profile...</h2>
        <p className="text-gray-400">Crafting your personalized path to success.</p>
      </div>
    </div>
  );
};
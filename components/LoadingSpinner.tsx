
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      <span className="text-sm text-gray-400">Fi-AI is analyzing...</span>
    </div>
  );
};

export default LoadingSpinner;

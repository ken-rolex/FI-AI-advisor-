
import React from 'react';

export const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const AiIcon: React.FC<{size?: number}> = ({ size = 6 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-${size} h-${size} text-white`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.75a9.25 9.25 0 100 18.5a9.25 9.25 0 000-18.5zM8.47 5.47a.75.75 0 011.06 0L12 7.94l2.47-2.47a.75.75 0 111.06 1.06L13.06 9l2.47 2.47a.75.75 0 11-1.06 1.06L12 10.06l-2.47 2.47a.75.75 0 01-1.06-1.06L10.94 9 8.47 6.53a.75.75 0 010-1.06zM5.75 14a.75.75 0 01.75.75v2.5c0 .41.34.75.75.75h8.5a.75.75 0 00.75-.75v-2.5a.75.75 0 011.5 0v2.5A2.25 2.25 0 0115.75 20h-8.5A2.25 2.25 0 015 17.25v-2.5a.75.75 0 01.75-.75z"/>
    </svg>
);

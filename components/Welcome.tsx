
import React from 'react';
import { AiIcon } from './Icons';

interface WelcomeProps {
    onPromptClick: (prompt: string) => void;
}

const examplePrompts = [
    "How is my net worth growing?",
    "How much did I spend on shopping last month?",
    "Is my Nifty 50 fund beating the market?",
    "Can I afford a ₹15L car?",
    "What should I do with my surplus cash this month?",
];

const Welcome: React.FC<WelcomeProps> = ({ onPromptClick }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-brand-gray">
            <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center mb-4">
                <AiIcon size={8} />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome to Fi-AI Advisor</h2>
            <p className="text-brand-light-gray mt-2 max-w-md">
                I'm ready to analyze your financial data. Ask me anything about your finances, or try one of the examples below.
            </p>

            <div className="mt-8 w-full max-w-md space-y-3">
                {examplePrompts.map((prompt) => (
                     <button
                        key={prompt}
                        onClick={() => onPromptClick(prompt)}
                        className="w-full text-left p-4 bg-brand-dark border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-brand-blue transition-all duration-200"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Welcome;
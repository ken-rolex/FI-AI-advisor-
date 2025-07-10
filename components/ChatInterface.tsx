
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ChartRenderer from './ChartRenderer';
import { UserIcon, AiIcon, SendIcon } from './Icons';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isAiThinking: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isAiThinking }) => {
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isAiThinking) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-gray">
      <div className="flex-grow p-4 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                <AiIcon />
              </div>
            )}
            <div className={`max-w-md w-full rounded-xl p-4 ${msg.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-brand-dark'}`}>
              {msg.isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}
                  {msg.visualization && (
                    <div className="mt-4">
                      <ChartRenderer chartData={msg.visualization} />
                    </div>
                  )}
                </>
              )}
            </div>
            {msg.sender === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <UserIcon />
              </div>
            )}
          </div>
        ))}
         <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isAiThinking ? "Fi-AI is thinking..." : "Ask a financial question..."}
            disabled={isAiThinking}
            className="w-full bg-brand-dark border border-gray-600 rounded-lg py-3 pl-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isAiThinking}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-blue disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

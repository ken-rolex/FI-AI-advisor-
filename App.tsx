
import React, { useState, useEffect, useCallback } from 'react';
import { FinancialData, ChatMessage } from './types';
import { fetchFinancialData } from './services/mcpService';
import { generateInsights } from './services/geminiService';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFinancialData();
        setFinancialData(data);
      } catch (err) {
        setError("Failed to load financial data. Please try again later.");
        console.error(err);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSendMessage = useCallback(async (question: string) => {
    if (!financialData || isAiThinking) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setIsAiThinking(true);

    const aiMessageId = `ai-${Date.now()}`;
    const loadingMessage: ChatMessage = {
      id: aiMessageId,
      sender: 'ai',
      isLoading: true,
    };
    setChatHistory(prev => [...prev, loadingMessage]);

    try {
      const response = await generateInsights(question, financialData);
      const aiResponseMessage: ChatMessage = {
        id: aiMessageId,
        sender: 'ai',
        text: response.insight,
        visualization: response.visualization,
        isLoading: false,
      };
      setChatHistory(prev => prev.map(msg => msg.id === aiMessageId ? aiResponseMessage : msg));
    } catch (err) {
      console.error("Error from Gemini Service:", err);
      const errorMessage: ChatMessage = {
        id: aiMessageId,
        sender: 'ai',
        text: "I'm sorry, but I encountered an error trying to process your request. Please try again.",
        isLoading: false,
      };
       setChatHistory(prev => prev.map(msg => msg.id === aiMessageId ? errorMessage : msg));
    } finally {
      setIsAiThinking(false);
    }
  }, [financialData, isAiThinking]);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col md:flex-row">
      <main className="w-full md:w-3/5 p-4 md:p-8 flex flex-col overflow-y-auto h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <span className="text-4xl mr-3">💰</span> Fi-AI Advisor
          </h1>
          <p className="text-brand-light-gray mt-1">Your personal financial intelligence agent.</p>
        </header>

        {isDataLoading && <div className="flex-grow flex items-center justify-center"><p>Loading your financial dashboard...</p></div>}
        {error && <div className="flex-grow flex items-center justify-center text-red-400"><p>{error}</p></div>}
        {financialData && !isDataLoading && !error && (
            <Dashboard financialData={financialData} />
        )}
      </main>

      <aside className="w-full md:w-2/5 bg-brand-gray h-screen flex flex-col border-l border-gray-700">
        {chatHistory.length === 0 ? (
          <Welcome onPromptClick={handleSendMessage} />
        ) : (
          <ChatInterface
            messages={chatHistory}
            onSendMessage={handleSendMessage}
            isAiThinking={isAiThinking}
          />
        )}
      </aside>
    </div>
  );
};

export default App;

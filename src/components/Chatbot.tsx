import React, { useState, useEffect, useRef } from 'react';
import { getChatbotResponse } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hey there! You found me. I'm Echo, Alfaz's AI assistant. What's on your mind?" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await getChatbotResponse(input);
    const botMessage: Message = { text: botResponseText, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-dark-card rounded-2xl shadow-2xl flex flex-col h-[70vh] max-h-[600px] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Chat with <span className="text-primary">Echo</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-dark-bg' : 'bg-gray-700 text-white'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
               <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-700 text-white flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2 delay-0"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2 delay-100"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-grow w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-primary text-dark-bg p-3 rounded-full font-bold hover:opacity-80 transition-opacity disabled:opacity-50">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
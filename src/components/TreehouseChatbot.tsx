import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  sources?: string[];
}

export const TreehouseChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(true); // Auto-open when component mounts
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Maria's AI assistant. Ask me anything about her background, education, work experience, projects, skills, interests, achievements, or personal stories!",
      sender: 'assistant'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const starterQuestions = [
    "What is Maria's background?",
    "Tell me about Maria's projects",
    "What are Maria's technical skills?",
    "What's a fun fact about Maria?",
    "What is Maria's education?",
    "What are Maria's interests?"
  ];


  const handleSendMessage = async (message?: string) => {
    const question = message || inputValue.trim();
    if (!question) return;

    // Add user message
    setMessages(prev => [...prev, { text: question, sender: 'user' }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "That's a great question! Maria has extensive experience in innovation, psychology, and technology.",
        "Maria is passionate about creating meaningful solutions at the intersection of human psychology and technology.",
        "Her background spans across multiple disciplines, allowing her to approach problems from unique perspectives.",
        "Maria's work focuses on understanding human behavior and translating that into innovative digital experiences."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'assistant' }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleStarterQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Panel */}
      {isChatOpen && (
        <div className="fixed inset-4 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-400">
          {/* Orb Background for Chat */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img 
              src="/Maria_Cherep_A_glowing_constellation_orb_designed_as_a_website_button,_surreal_3416095e-4f2a-4768-8fd4-854db8f10ddc.png"
              alt="Background Orb"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="relative bg-white/80 backdrop-blur-sm text-gray-800 p-6 text-center font-light text-xl border-b border-gray-200/50">
            Ask Maria Anything
            <button 
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300"
              onClick={() => setIsChatOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="relative flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm shadow-sm",
                message.sender === 'user' 
                  ? "ml-auto bg-blue-500 text-white rounded-br-sm"
                  : "bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200/50 rounded-bl-sm"
              )}>
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="max-w-[80%] p-4 rounded-2xl rounded-bl-sm bg-white/90 backdrop-blur-sm border border-gray-200/50 text-sm text-gray-600">
                <em>Maria is typing...</em>
              </div>
            )}

            {/* Starter Questions */}
            {messages.length === 1 && (
              <div className="space-y-3 mt-6">
                {starterQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-4 text-sm bg-white/70 hover:bg-white/90 text-gray-700 hover:text-gray-900 rounded-xl border border-gray-200/50 hover:border-gray-300 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
                    onClick={() => handleStarterQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative p-6 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
            <div className="flex gap-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about Maria..."
                className="flex-1 px-5 py-3 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800 placeholder-gray-500"
                autoFocus
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
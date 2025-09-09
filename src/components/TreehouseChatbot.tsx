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
        <div className="fixed inset-8 bg-white border border-gray-100 shadow-xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-400">
          {/* Header with small orb */}
          <div className="relative bg-white p-8 border-b border-gray-100">
            <div className="flex items-center justify-center gap-4">
              <img 
                src="/Maria_Cherep_A_glowing_constellation_orb_designed_as_a_website_button,_surreal_3416095e-4f2a-4768-8fd4-854db8f10ddc.png"
                alt="Maria's Constellation"
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-xl font-light text-black tracking-wide">ASK MARIA</h1>
            </div>
            <button 
              className="absolute top-6 right-6 w-10 h-10 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-all duration-300"
              onClick={() => setIsChatOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50/30">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "max-w-[70%]",
                message.sender === 'user' 
                  ? "ml-auto"
                  : ""
              )}>
                <div className={cn(
                  "p-5 text-sm leading-relaxed",
                  message.sender === 'user' 
                    ? "bg-black text-white"
                    : "bg-white border border-gray-100 text-gray-800"
                )}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="max-w-[70%]">
                <div className="bg-white border border-gray-100 p-5 text-sm text-gray-500 italic">
                  Maria is responding...
                </div>
              </div>
            )}

            {/* Starter Questions */}
            {messages.length === 1 && (
              <div className="space-y-3 mt-8">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">SUGGESTED QUESTIONS</p>
                {starterQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-4 text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-100 hover:border-gray-200 transition-all duration-300"
                    onClick={() => handleStarterQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-8 bg-white border-t border-gray-100">
            <div className="flex gap-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question here..."
                className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 outline-none focus:border-black text-sm text-black placeholder-gray-400 transition-all duration-300"
                autoFocus
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="px-8 py-4 bg-black hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-medium text-sm uppercase tracking-wide transition-all duration-300"
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
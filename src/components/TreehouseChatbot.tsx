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
        <div className="fixed bottom-8 right-8 w-96 h-[32rem] bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-400">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-sm text-white/90 p-4 text-center font-light text-base relative border-b border-white/10">
            Ask Maria Anything
            <button 
              className="absolute top-3 right-3 w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white/90 transition-all duration-300"
              onClick={() => setIsChatOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "max-w-[85%] p-3 rounded-2xl text-sm",
                message.sender === 'user' 
                  ? "ml-auto bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 rounded-br-sm"
                  : "bg-white/5 backdrop-blur-sm text-white/80 border border-white/10 rounded-bl-sm"
              )}>
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="max-w-[85%] p-3 rounded-2xl rounded-bl-sm bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/60">
                <em>Maria is typing...</em>
              </div>
            )}

            {/* Starter Questions */}
            {messages.length === 1 && (
              <div className="space-y-2 mt-4">
                {starterQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-3 text-xs bg-white/5 hover:bg-white/10 text-white/70 hover:text-white/90 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    onClick={() => handleStarterQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about Maria..."
                className="flex-1 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full outline-none focus:ring-2 focus:ring-white/30 text-sm text-white/90 placeholder-white/50"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white/90 rounded-full font-light hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
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
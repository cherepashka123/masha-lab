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
        <div className="fixed bottom-5 right-5 w-90 h-125 bg-background border border-border rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-400">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-5 text-center font-bold text-lg relative">
            Ask Maria Anything
            <button 
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-xl"
              onClick={() => setIsChatOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto bg-muted/30 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm",
                message.sender === 'user' 
                  ? "ml-auto bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-md"
                  : "bg-background border border-border rounded-bl-md"
              )}>
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="max-w-[80%] p-3 rounded-2xl rounded-bl-md bg-background border border-border text-sm">
                <em>Maria is typing...</em>
              </div>
            )}

            {/* Starter Questions */}
            {messages.length === 1 && (
              <div className="space-y-2 mt-4">
                {starterQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-2 text-xs bg-gradient-to-r from-secondary to-accent/20 text-secondary-foreground rounded-xl hover:translate-x-1 transition-all duration-300 hover:shadow-md"
                    onClick={() => handleStarterQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 bg-background border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about Maria..."
                className="flex-1 px-4 py-3 border border-input rounded-full outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-5 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg"
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
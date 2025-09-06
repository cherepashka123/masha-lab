import { useState } from "react";
import { X, Send, BookOpen, FileText } from "lucide-react";
import { LabObjectData } from "./InnovationLab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ChatModalProps {
  object: LabObjectData;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  mode?: 'research' | 'diary';
}

const getThemeResponses = (theme: string, mode: 'research' | 'diary') => {
  const responses = {
    ukraine: {
      research: [
        "Born in Ukraine, bringing resilience and cultural perspective to every project.",
        "Fluent in Ukrainian, Russian, and English - bridging cultural gaps in international teams.",
        "Heritage informs my approach to inclusive design and global market understanding."
      ],
      diary: [
        "Growing up in Ukraine taught me the power of community and perseverance. These values shape how I build teams and tackle challenges.",
        "My Ukrainian heritage isn't just background - it's a lens for seeing opportunity in adversity and beauty in simplicity.",
        "The warmth and creativity of Ukrainian culture influences my design philosophy and collaborative approach."
      ]
    },
    nyc: {
      research: [
        "NYU Psychology major, 3.9 GPA. Minors: Business, Social Entrepreneurship, Philosophy.",
        "NYU coursework: Digital Business, Marketing, Programming, Statistics, Design Thinking.",
        "NYU Pitch Competition finalist for innovative startup concepts."
      ],
      diary: [
        "New York taught me to think fast and dream big. Every subway ride was a lesson in human behavior.",
        "NYU wasn't just education - it was immersion in a world where psychology meets business innovation.",
        "The city's energy flows through everything I create. Fast-paced, diverse, endlessly inspiring."
      ]
    },
    fashion: {
      research: [
        "DRESSX: Marketing & Strategy Intern 2024-25, Strategy/Product/Sustainability Summer 2025.",
        "Threadress: Built AI-driven natural language search with vector-based style matching.",
        "Naked Confidence: Co-founded perfume brand focusing on authentic self-expression."
      ],
      diary: [
        "Fashion tech isn't just about clothes - it's about identity in digital spaces. DRESSX opened my eyes to virtual fashion's potential.",
        "Building Threadress felt like creating magic - turning 'I want something flowy and romantic' into perfect boutique finds.",
        "Naked Confidence started from a simple truth: scent is memory, and confidence is choice."
      ]
    },
    psychology: {
      research: [
        "Psychology major with focus on cognitive science and behavioral analysis.",
        "Philosophy minor exploring ethics, consciousness, and decision-making frameworks.",
        "Applied psychological principles to UX design and product strategy."
      ],
      diary: [
        "Psychology taught me that behind every click, swipe, and purchase is a human story waiting to be understood.",
        "Philosophy classes at 8am might have been brutal, but they taught me to question everything - especially 'obvious' solutions.",
        "The intersection of mind and technology fascinates me. How do we build products that truly serve human nature?"
      ]
    },
    business: {
      research: [
        "DevolaTech: Growth Analyst role, data-driven strategy and market expansion.",
        "Dragon Capital: Investment Banking Intern, financial modeling and market analysis.",
        "Rise by Barclays: Fintech accelerator participant, design thinking pitch finalist."
      ],
      diary: [
        "Dragon Capital showed me the art of seeing potential in numbers and narratives in data.",
        "At DevolaTech, I learned that growth isn't just metrics - it's about understanding what makes users return.",
        "Rise by Barclays was a masterclass in turning complex financial problems into elegant solutions."
      ]
    }
  };

  return responses[theme as keyof typeof responses]?.[mode] || [
    "I'd love to explore that topic, but it belongs in another area of the lab. Try clicking on a different glowing object!"
  ];
};

export const ChatModal = ({ object, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Welcome to my ${object.title} space! I'm excited to share this part of my journey with you. You can ask me anything related to ${object.description.toLowerCase()}.`,
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [currentMode, setCurrentMode] = useState<'research' | 'diary'>('research');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate response based on theme and mode
    const responses = getThemeResponses(object.theme, currentMode);
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: randomResponse,
      isUser: false,
      mode: currentMode
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img 
              src={object.image} 
              alt={object.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{object.title}</h3>
              <p className="text-sm text-muted-foreground">{object.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Mode Toggle */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-2">
            <Button
              variant={currentMode === 'research' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentMode('research')}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Research Notes
            </Button>
            <Button
              variant={currentMode === 'diary' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentMode('diary')}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Lab Diary
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.mode && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {message.mode === 'research' ? 'Research Notes' : 'Lab Diary'}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask me about ${object.title.toLowerCase()}...`}
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
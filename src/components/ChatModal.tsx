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
        "Ukrainian-born, fluent in Ukrainian, Russian, English, and intermediate French. Cultural bridge in global teams.",
        "Volunteered with TABLETOCHKI Cancer Foundation, supporting 50+ children and teaching English during treatment.",
        "Heritage provides unique perspective on resilience, community, and finding beauty in simplicity."
      ],
      diary: [
        "Growing up in Ukraine taught me that strength isn't just surviving - it's creating beauty despite uncertainty.",
        "Every conversation in multiple languages feels like code-switching between different parts of my identity.",
        "Ukrainian warmth and creativity infuse everything I build - from products to partnerships."
      ]
    },
    nyc: {
      research: [
        "NYU Psychology B.A., 3.9 GPA. Minors: Business, Social Entrepreneurship, Philosophy. Expected May 2026.",
        "Blair Academy alumna (4.0 GPA). Active in Luxury & Retail Association, Stern Founders Challenge Society.",
        "NYU coursework: Digital Business Strategy, Social Media Strategy, Programming, Statistics, Management."
      ],
      diary: [
        "New York is my laboratory. Every subway ride teaches me about human behavior and urban psychology.",
        "From Blair's structured environment to NYU's creative chaos - each step shaped my analytical yet intuitive approach.",
        "The city's relentless pace matches my mind. Here, psychology meets business meets pure possibility."
      ]
    },
    fashion: {
      research: [
        "DRESSX: Marketing & Strategy Intern (May 2024-Jan 2025), then Strategy/Product/Sustainability (Summer 2025).",
        "Threadress: AI-driven local fashion discovery. Natural language search converts style descriptions to vector matches for local boutique inventory.",
        "Naked Confidence: Founded unisex perfume brand, collaborated with Ol.factory, researched 200+ consumers for signature scent development.",
        "DRESSX achievements: Led Roblox x Charles & Keith campaign with 100+ creators, researched 20+ Snapchat agencies, enhanced Gen AI styling tool."
      ],
      diary: [
        "Fashion tech revealed something profound: clothing isn't just fabric - it's identity expressed in physical and digital spaces.",
        "Threadress was born from frustration: 'I need a gold dress for tonight' shouldn't require hours of scrolling. AI should understand style, not just keywords.",
        "At DRESSX, I saw the future: virtual fashion reducing waste while expanding self-expression. Sustainability meets imagination."
      ]
    },
    psychology: {
      research: [
        "Psychology major focusing on cognitive science, behavioral analysis, and decision-making frameworks.",
        "Philosophy minor exploring consciousness, ethics, and how philosophical thinking shapes product design.",
        "Applied psychological insights to UX design, user research, and behavioral product strategy."
      ],
      diary: [
        "Psychology reveals the 'why' behind every user interaction. Philosophy asks 'should we?' Technology answers 'how?'",
        "Every A/B test is a glimpse into human nature. Every user interview unveils a story waiting to be served.",
        "The mind fascinates me because it's the ultimate user interface - messy, beautiful, endlessly surprising."
      ]
    },
    business: {
      research: [
        "DevolaTech: Growth Analyst, generated 500+ leads, expanded into 3+ new markets through targeted B2B campaigns.",
        "Dragon Capital: Investment Banking Intern, analyzed Green Bonds/Eurobonds, participated in 10+ conference calls, analyzed P&L for multi-million portfolios.",
        "Rise by Barclays: Fintech accelerator participant, MVP development, surveyed 300+ users and 30+ retailers, pitched to industry judges."
      ],
      diary: [
        "Dragon Capital taught me that every number tells a story. Behind every bond is a bet on the future.",
        "DevolaTech showed me growth isn't just metrics - it's understanding what makes users return, recommend, and stay.",
        "Rise by Barclays was intense: turning complex payment problems into elegant solutions under pressure. I loved every minute."
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
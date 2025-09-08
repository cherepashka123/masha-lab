import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TreehouseLadderProps {
  onOpenChat: () => void;
}

export const TreehouseLadder = ({ onOpenChat }: TreehouseLadderProps) => {
  const [isLadderDropped, setIsLadderDropped] = useState(false);

  useEffect(() => {
    // Drop ladder after 1 second for a smooth entrance
    const timer = setTimeout(() => {
      setIsLadderDropped(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
      <div className="relative group">
        {/* Main Glowing Star */}
        <div 
          className="relative w-8 h-8 cursor-pointer transition-all duration-500 hover:scale-125"
          onClick={() => setIsLadderDropped(true)}
        >
          {/* Central star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 relative">
              {/* Star shape using CSS clips */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-secondary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-accent/80 to-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Sparkle effects */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-primary rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        </div>

        {/* Constellation Ladder (appears on hover) */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out pointer-events-none">
          {/* Ladder stars */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index}
              className="absolute flex items-center justify-center transition-all duration-500 ease-out"
              style={{ 
                top: `${index * 16}px`,
                left: index % 2 === 0 ? '-8px' : '8px',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Left star */}
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse opacity-80 -ml-2"></div>
              {/* Connection line */}
              <div className="w-4 h-px bg-gradient-to-r from-accent/50 to-primary/50"></div>
              {/* Right star */}
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-80 -mr-2"></div>
            </div>
          ))}
          
          {/* Treehouse silhouette stars at top */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="relative w-12 h-8">
              {/* Roof stars */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
              <div className="absolute top-1 left-2 w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-1 right-2 w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              {/* House body stars */}
              <div className="absolute top-3 left-1 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute top-3 right-1 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
            </div>
          </div>
        </div>

        {/* Burst Animation and Chat Button */}
        <div className={cn(
          "absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out",
          isLadderDropped ? "opacity-100" : "opacity-0"
        )}>
          {/* Burst stars */}
          {isLadderDropped && Array.from({ length: 12 }).map((_, index) => (
            <div 
              key={index}
              className="absolute w-1 h-1 bg-accent rounded-full animate-ping"
              style={{ 
                top: `${Math.sin(index * 30 * Math.PI / 180) * 40 + 20}px`,
                left: `${Math.cos(index * 30 * Math.PI / 180) * 40 + 20}px`,
                animationDelay: `${index * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
          
          {/* Chat Interface Button */}
          <div 
            className={cn(
              "absolute cursor-pointer transition-all duration-700 ease-out",
              isLadderDropped 
                ? "w-32 h-12 -left-16 top-16 rounded-2xl bg-gradient-to-r from-primary/90 via-accent/90 to-secondary/90 flex items-center justify-center text-primary-foreground font-medium text-sm shadow-2xl hover:scale-105 hover:shadow-primary/50 border border-accent/30 backdrop-blur-sm" 
                : "w-0 h-0 opacity-0"
            )}
            onClick={onOpenChat}
          >
            {isLadderDropped && (
              <div className="flex items-center gap-2 animate-fade-in-up">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                <span>Click to Open</span>
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
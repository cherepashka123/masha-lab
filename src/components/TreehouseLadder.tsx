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
        {/* Modern Tech Icon */}
        <div 
          className="relative w-20 h-20 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl shadow-2xl cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:rotate-3 border border-border/20 backdrop-blur-sm"
          onClick={() => setIsLadderDropped(true)}
        >
          {/* Circuit pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-2 w-1 h-1 bg-accent rounded-full"></div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-accent rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-accent rounded-full"></div>
            <div className="absolute top-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          </div>
          
          {/* Central AI symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-foreground/80 to-accent/80 flex items-center justify-center shadow-inner">
              <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-sm rotate-45 shadow-sm"></div>
            </div>
          </div>

          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 animate-pulse"></div>
        </div>

        {/* Interactive Connection Line */}
        <div className={cn(
          "absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary transition-all duration-2000 ease-out",
          isLadderDropped ? "h-32 opacity-100" : "h-0 opacity-0"
        )}>
          {/* Data nodes */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index} 
              className="absolute w-2 h-2 bg-accent rounded-full -left-0.75 shadow-lg animate-pulse"
              style={{ 
                top: `${(index + 1) * 20}px`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
          
          {/* Chat Interface Button */}
          <div 
            className={cn(
              "absolute cursor-pointer transition-all duration-700 ease-out group/btn",
              isLadderDropped 
                ? "w-40 h-14 -left-20 top-28 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-2xl hover:scale-105 hover:shadow-3xl border border-border/20 backdrop-blur-sm" 
                : "w-2 h-2 -left-0.75 top-28 bg-accent rounded-full opacity-0"
            )}
            onClick={onOpenChat}
          >
            {isLadderDropped && (
              <div className="flex items-center gap-2 animate-fade-in-up">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                <span>Click to Connect</span>
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
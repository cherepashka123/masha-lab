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
    <div className="min-h-screen w-full bg-white relative overflow-hidden cursor-pointer" onClick={() => setIsLadderDropped(true)}>
      {/* Invisible clickable center area for better UX */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 hover:bg-gray-50 transition-all duration-500 flex items-center justify-center group">
          {/* Subtle pulse indicator in center */}
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse group-hover:w-6 group-hover:h-6 group-hover:bg-gray-400 transition-all duration-500"></div>
        </div>
      </div>

      {/* Burst Animation and Chat Button */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out pointer-events-none",
        isLadderDropped ? "opacity-100" : "opacity-0"
      )}>
        {/* Burst stars */}
        {isLadderDropped && Array.from({ length: 12 }).map((_, index) => (
          <div 
            key={index}
            className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
            style={{ 
              top: `${Math.sin(index * 30 * Math.PI / 180) * 200 + 50}%`,
              left: `${Math.cos(index * 30 * Math.PI / 180) * 200 + 50}%`,
              animationDelay: `${index * 0.1}s`,
              animationDuration: '2s'
            }}
          />
        ))}
        
        {/* Chat Interface Button */}
        <div 
          className={cn(
            "absolute cursor-pointer transition-all duration-700 ease-out pointer-events-auto",
            isLadderDropped 
              ? "w-36 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white font-light text-sm shadow-lg hover:shadow-xl border border-white/10 hover:border-white/20 backdrop-blur-md" 
              : "w-0 h-0 opacity-0"
          )}
          onClick={onOpenChat}
        >
          {isLadderDropped && (
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <span>Enter Chat</span>
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
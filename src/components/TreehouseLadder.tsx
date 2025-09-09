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
      {/* Clickable center area with visible text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center cursor-pointer group">
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse group-hover:w-6 group-hover:h-6 group-hover:bg-gray-400 transition-all duration-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light text-lg tracking-wide group-hover:text-black transition-all duration-300">
            Click to Enter Chat
          </p>
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
              className="absolute w-2 h-2 bg-gray-400 rounded-full animate-ping"
              style={{ 
                top: `${Math.sin(index * 30 * Math.PI / 180) * 200 + 50}%`,
                left: `${Math.cos(index * 30 * Math.PI / 180) * 200 + 50}%`,
                animationDelay: `${index * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
          
          {/* Chat Interface Button - positioned in center */}
          <div 
            className={cn(
              "cursor-pointer transition-all duration-700 ease-out pointer-events-auto text-center",
              isLadderDropped 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            )}
            onClick={onOpenChat}
          >
            {isLadderDropped && (
              <div className="animate-fade-in">
                <div className="w-6 h-6 bg-gray-400 rounded-full animate-pulse mx-auto mb-4"></div>
                <div className="px-8 py-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300">
                  <span className="text-gray-800 font-light text-sm tracking-wide">ENTER CHAT</span>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};
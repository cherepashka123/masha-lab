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
      <div className="relative">
        {/* Treehouse */}
        <div 
          className="relative w-24 h-20 bg-gradient-to-br from-amber-700 to-amber-800 rounded-t-3xl shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-3xl"
          onClick={() => setIsLadderDropped(true)}
        >
          {/* Roof */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[20px] border-l-transparent border-r-transparent border-b-amber-700" />
          
          {/* Windows */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-100 border-2 border-amber-900 rounded-full shadow-inner" />
          <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-100 border-2 border-amber-900 rounded-full shadow-inner" />
          
          {/* Door */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-5 bg-amber-900 rounded-t-lg" />
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-600 rounded-full" />
        </div>

        {/* Rope Ladder */}
        <div className={cn(
          "absolute top-20 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-amber-700 to-amber-900 transition-all duration-2000 ease-out shadow-lg",
          isLadderDropped ? "h-40" : "h-0"
        )}>
          {/* Rungs */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="absolute w-6 h-1 bg-amber-700 -left-2.5 rounded-sm shadow-md"
              style={{ top: `${(index + 1) * 18}px` }}
            />
          ))}
          
          {/* Chat Button */}
          <div 
            className={cn(
              "absolute cursor-pointer transition-all duration-700 ease-out",
              isLadderDropped 
                ? "w-32 h-12 -left-16 top-36 rounded-full bg-gradient-to-r from-primary to-lab-primary flex items-center justify-center text-primary-foreground font-medium text-sm shadow-xl hover:scale-110 hover:shadow-2xl" 
                : "w-6 h-1 -left-2.5 top-36 bg-gradient-to-r from-primary to-lab-primary rounded-sm opacity-0"
            )}
            onClick={onOpenChat}
          >
            {isLadderDropped && (
              <span className="animate-fade-in-up">
                Ask Maria
              </span>
            )}
          </div>
        </div>

        {/* Floating instruction text */}
        {isLadderDropped && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center animate-fade-in-up">
            <p className="text-muted-foreground text-sm font-light">
              Click the button to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        {/* Hyperrealistic Glowing Orb - Centered */}
        <div 
          className="relative cursor-pointer transition-all duration-700 ease-out group"
          onClick={() => setIsLadderDropped(true)}
        >
          {/* Main Orb Image */}
          <div className="relative w-24 h-24 group-hover:w-28 group-hover:h-28 transition-all duration-500">
            <img 
              src="/Maria_Cherep_A_glowing_constellation_orb_designed_as_a_website_button,_surreal_3416095e-4f2a-4768-8fd4-854db8f10ddc.png"
              alt="Constellation Orb"
              className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
            />
            
            {/* Minimalist glow effects */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl animate-pulse opacity-60"></div>
            
            {/* Interactive ripple effect on hover */}
            <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent rounded-full scale-0 group-hover:scale-150 transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100"></div>
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
import { useState } from "react";
import { LabObjectData } from "./InnovationLab";

interface LabObjectProps {
  object: LabObjectData;
  isExplored: boolean;
  onClick: () => void;
}

export const LabObject = ({ object, isExplored, onClick }: LabObjectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`
        absolute w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden
        transition-all duration-300 transform-gpu
        hover:scale-110 focus:scale-110 focus:outline-none
        ${isExplored ? 'animate-pulse-glow' : 'animate-pulse-glow opacity-80'}
        ${isHovered ? 'z-20' : 'z-10'}
        float
      `}
      style={{
        left: object.position.x,
        top: object.position.y,
        animationDelay: `${Math.random() * 2}s`
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`Explore ${object.title}: ${object.description}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-holographic rounded-xl blur-sm opacity-60" />
      
      {/* Object image */}
      <div className="relative w-full h-full">
        <img
          src={object.image}
          alt={object.title}
          className="w-full h-full object-cover rounded-xl"
        />
        
        {/* Overlay with holographic effect */}
        <div className="absolute inset-0 bg-gradient-holographic opacity-30 rounded-xl animate-holographic-shift" />
        
        {/* Exploration indicator */}
        {isExplored && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
        )}
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 
                        bg-card border border-border rounded-lg px-3 py-2 
                        text-sm font-medium text-card-foreground whitespace-nowrap
                        shadow-lg z-30">
          <div className="font-semibold">{object.title}</div>
          <div className="text-xs text-muted-foreground">{object.description}</div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                          w-0 h-0 border-l-4 border-r-4 border-t-4 
                          border-l-transparent border-r-transparent border-t-card" />
        </div>
      )}
    </button>
  );
};
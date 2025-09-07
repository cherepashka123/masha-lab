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
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-500 ${
        isExplored ? 'opacity-80' : 'opacity-100'
      }`}
      style={{
        left: object.position.x,
        top: object.position.y,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle glow effect */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
          isHovered ? 'subtle-glow scale-125' : 'scale-100'
        } ${isExplored ? 'bg-lab-accent/10' : 'bg-lab-primary/15'}`} 
      />
      
      {/* Main object container */}
      <div className={`relative w-28 h-28 rounded-2xl overflow-hidden border transition-all duration-500 shadow-lg ${
        isExplored 
          ? 'border-lab-accent/30 hover:border-lab-accent/60' 
          : 'border-lab-primary/20 hover:border-lab-primary/40'
      } ${isHovered ? 'scale-105 shadow-xl' : 'scale-100'} bg-card/80 backdrop-blur-sm`}>
        
        {/* Object image */}
        <img
          src={object.image}
          alt={object.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        
        {/* Exploration indicator */}
        {isExplored && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-lab-accent rounded-full" />
        )}
      </div>

      {/* Elegant hover tooltip */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 px-4 py-3 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl fade-in-up max-w-xs">
          <h4 className="text-sm font-medium text-card-foreground whitespace-nowrap">
            {object.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
            {object.description}
          </p>
        </div>
      )}
    </button>
  );
};
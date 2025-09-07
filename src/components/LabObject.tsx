import { useState } from "react";
import { LabObjectData } from "./InnovationLab";

interface LabObjectProps {
  object: LabObjectData;
  isExplored: boolean;
  onClick: () => void;
  index: number;
}

export const LabObject = ({ object, isExplored, onClick, index }: LabObjectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Minimalist Card - Farfetch inspired */}
      <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border/30 transition-all duration-500 hover:border-foreground/20">
        
        {/* Image */}
        <img
          src={object.image}
          alt={object.title}
          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02] brightness-75 hover:brightness-100 contrast-125"
        />
        
        {/* Subtle overlay on hover */}
        <div className={`
          absolute inset-0 bg-black/0 transition-all duration-500
          ${isHovered ? 'bg-black/10' : ''}
        `} />
        
        {/* Content overlay - minimal */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top: Exploration indicator */}
          <div className="flex justify-end">
            {isExplored && (
              <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            )}
          </div>
          
          {/* Bottom: Title */}
          <div className={`transform transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}>
            <h3 className="text-white font-light text-lg tracking-[0.1em] drop-shadow-lg">
              {object.title.toUpperCase()}
            </h3>
          </div>
        </div>
        
        {/* Hover overlay with description */}
        <div className={`
          absolute inset-0 bg-black/60 flex items-center justify-center p-6
          transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          <div className="text-center space-y-4">
            <h3 className="text-white font-light text-xl tracking-[0.1em]">
              {object.title.toUpperCase()}
            </h3>
            <div className="w-12 h-px bg-white/40 mx-auto" />
            <p className="text-white/90 text-sm font-light leading-relaxed max-w-48">
              {object.description}
            </p>
            <div className="text-white/60 text-xs font-light tracking-wider pt-2">
              EXPLORE →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
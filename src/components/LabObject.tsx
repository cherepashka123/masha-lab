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
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container - Farfetch style */}
      <div className={`
        relative aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border
        transition-all duration-300 hover:shadow-lg hover:border-lab-primary/30
        ${isExplored ? 'ring-1 ring-lab-primary/20' : ''}
      `}>
        
        {/* Image */}
        <img
          src={object.image}
          alt={object.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
          transition-opacity duration-300 
          ${isHovered ? 'opacity-80' : 'opacity-40'}
        `} />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
            <h3 className="text-white font-light text-lg mb-2 tracking-wide">
              {object.title}
            </h3>
            <p className={`text-white/80 text-sm font-light leading-relaxed transition-all duration-300 ${
              isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {object.description}
            </p>
          </div>
        </div>
        
        {/* Exploration Badge */}
        {isExplored && (
          <div className="absolute top-4 right-4">
            <div className="w-2 h-2 bg-lab-primary rounded-full animate-pulse" />
          </div>
        )}
        
        {/* Click indicator */}
        <div className={`
          absolute bottom-4 right-4 
          w-8 h-8 rounded-full border border-white/30 
          flex items-center justify-center
          transition-all duration-300
          ${isHovered ? 'scale-110 bg-white/10' : 'scale-100'}
        `}>
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};
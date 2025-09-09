import { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  media: string | null;
  type: 'video' | 'image' | 'placeholder';
  year: string;
}

interface ProjectTileProps {
  project: Project;
  index: number;
  scrollY: number;
  sectionStart: number;
}

export const ProjectTile = ({ project, index, scrollY, sectionStart }: ProjectTileProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate scroll-based animation
  const elementStart = sectionStart + (index * 100);
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - elementStart) / 400));
  const translateY = (1 - scrollProgress) * 60;
  const opacity = scrollProgress;
  const scale = 0.9 + (scrollProgress * 0.1);

  return (
    <div
      className="group cursor-pointer"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Container */}
      <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-muted/20 rounded-lg border border-muted/40">
        {project.type === 'video' && project.media ? (
          <video
            src={project.media}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : project.type === 'image' && project.media ? (
          <img
            src={project.media}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center transition-all duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-primary/30 rounded-sm" />
              </div>
              <p className="text-xs text-muted-foreground">Media placeholder</p>
            </div>
          </div>
        )}
        
        {/* Immersive Hover Overlay */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          isHovered 
            ? 'bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-100' 
            : 'opacity-0'
        }`} />
        
        {/* Floating particles on hover */}
        {isHovered && (
          <>
            <div className="absolute top-4 right-4">
              <div className="flex space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
                    style={{ 
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="w-8 h-px bg-white/60 animate-pulse" />
            </div>
          </>
        )}
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            {project.category}
          </span>
          <span className="text-xs tracking-widest text-muted-foreground">
            {project.year}
          </span>
        </div>
        
        <h4 className={`text-xl font-light tracking-wide transition-all duration-300 ${
          isHovered ? 'text-primary translate-x-2' : 'text-foreground'
        }`}>
          {project.title}
        </h4>
        
        <p className={`text-sm leading-relaxed text-muted-foreground transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
        }`}>
          {project.description}
        </p>
        
        {/* Action Indicator */}
        <div className={`flex items-center space-x-2 mt-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}>
          <div className="w-6 h-px bg-primary" />
          <span className="text-xs tracking-widest text-primary uppercase">
            Explore
          </span>
        </div>
      </div>
    </div>
  );
};
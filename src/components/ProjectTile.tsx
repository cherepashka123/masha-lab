import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  media: string | null;
  type: 'video' | 'image' | 'placeholder';
  year: string;
  route: string;
}

interface ProjectTileProps {
  project: Project;
  index: number;
  scrollY: number;
  sectionStart: number;
}

export const ProjectTile = ({ project, index, scrollY, sectionStart }: ProjectTileProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Calculate scroll-based animation with staggered reveal
  const elementStart = sectionStart + (index * 200);
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - elementStart) / 500));
  const translateY = (1 - scrollProgress) * 80;
  const opacity = scrollProgress;
  const scale = 0.85 + (scrollProgress * 0.15);

  const handleClick = () => {
    navigate(project.route);
  };

  return (
    <div
      className="group cursor-pointer transform-gpu"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: opacity,
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Media Container with enhanced interactions */}
      <div className="relative aspect-[4/3] mb-8 overflow-hidden bg-muted/20 rounded-2xl border border-muted/40 group-hover:border-primary/30 transition-all duration-700">
        {project.type === 'video' && project.media ? (
          <video
            src={project.media}
            className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
              isHovered ? 'scale-115 brightness-110 saturate-110' : 'scale-100'
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
            className={`w-full h-full object-contain p-8 transition-all duration-1000 ease-out ${
              isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
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
        
        {/* Enhanced immersive overlay */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isHovered 
            ? 'bg-gradient-to-br from-primary/30 via-primary/5 to-transparent opacity-100' 
            : 'opacity-0'
        }`} />
        
        {/* Micro animations inspired by stefanstefancik.com */}
        {isHovered && (
          <>
            {/* Floating dots */}
            <div className="absolute top-6 right-6">
              <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-white/90 rounded-full animate-bounce opacity-80"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Animated lines */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex justify-between items-center">
                <div className="w-12 h-px bg-white/70 animate-pulse" />
                <div className="w-8 h-px bg-white/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-6 h-px bg-white/40 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/40 rounded-tl-2xl animate-fade-in" />
          </>
        )}

        {/* Click indicator */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-white text-sm font-medium tracking-wide">View Project</span>
          </div>
        </div>
      </div>

      {/* Enhanced Project Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
            isHovered ? 'text-primary/80 tracking-[0.3em]' : 'text-muted-foreground'
          }`}>
            {project.category}
          </span>
          <span className="text-xs tracking-widest text-muted-foreground/60">
            {project.year}
          </span>
        </div>
        
        <h4 className={`text-2xl font-light tracking-tight transition-all duration-500 ${
          isHovered ? 'text-primary translate-x-3 tracking-wide' : 'text-foreground'
        }`}>
          {project.title}
        </h4>
        
        <p className={`text-sm leading-relaxed transition-all duration-500 ${
          isHovered ? 'text-foreground/90 translate-y-0' : 'text-muted-foreground/80 translate-y-1'
        }`}>
          {project.description}
        </p>
        
        {/* Enhanced action indicator */}
        <div className={`flex items-center space-x-3 mt-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <div className={`h-px bg-primary transition-all duration-700 ${
            isHovered ? 'w-12' : 'w-6'
          }`} />
          <span className="text-xs tracking-[0.2em] text-primary uppercase font-medium">
            Explore →
          </span>
        </div>
      </div>
    </div>
  );
};
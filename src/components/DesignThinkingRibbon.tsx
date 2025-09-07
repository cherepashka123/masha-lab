import { useState, useEffect } from "react";
import { Heart, Target, Lightbulb, Settings, CheckCircle } from "lucide-react";

interface DesignThinkingRibbonProps {
  currentStage: number;
}

const stages = [
  {
    id: 1,
    icon: Heart,
    label: "Empathize",
    description: "Understanding cultural identity and human connection"
  },
  {
    id: 2,
    icon: Target,
    label: "Define",
    description: "NYC life defines work style and perspective"
  },
  {
    id: 3,
    icon: Lightbulb,
    label: "Ideate",
    description: "Philosophy and creative thinking process"
  },
  {
    id: 4,
    icon: Settings,
    label: "Prototype",
    description: "Fashion tech and business innovation projects"
  },
  {
    id: 5,
    icon: CheckCircle,
    label: "Test",
    description: "Psychology insights validate human-centered solutions"
  }
];

export const DesignThinkingRibbon = ({ currentStage }: DesignThinkingRibbonProps) => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-6">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = currentStage >= stage.id;
            const isCurrent = currentStage === stage.id;
            
            return (
              <div
                key={stage.id}
                className="relative flex items-center gap-3"
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Stage Icon */}
                <div className={`
                  relative p-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted/50 text-muted-foreground'
                  }
                  ${isCurrent ? 'ring-2 ring-primary/50 scale-110' : ''}
                  ${hoveredStage === stage.id ? 'scale-110' : ''}
                `}>
                  <Icon className="w-4 h-4" />
                  
                  {/* Glow effect for current stage */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                  )}
                </div>

                {/* Connector line */}
                {index < stages.length - 1 && (
                  <div className={`
                    w-8 h-px transition-colors duration-300
                    ${isActive ? 'bg-primary/30' : 'bg-border/30'}
                  `} />
                )}

                {/* Tooltip */}
                {hoveredStage === stage.id && (
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 w-64">
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg animate-fade-in">
                      <div className="text-sm font-medium text-foreground mb-1">
                        {stage.label}
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {stage.description}
                      </div>
                      
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress text */}
        <div className="text-center mt-2">
          <div className="text-xs text-muted-foreground font-light tracking-wide">
            Design Thinking Journey: {currentStage}/5
          </div>
        </div>
      </div>
    </div>
  );
};
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
    description: "Maria empathizes with global perspectives through cultural identity stories"
  },
  {
    id: 2,
    icon: Target,
    label: "Define", 
    description: "Defining how NYC life and studies shape her innovative approach"
  },
  {
    id: 3,
    icon: Lightbulb,
    label: "Ideate",
    description: "Exploring psychology & philosophy frameworks for creative solutions"
  },
  {
    id: 4,
    icon: Settings,
    label: "Prototype",
    description: "Building fashion-tech innovations and strategic product solutions"
  },
  {
    id: 5,
    icon: CheckCircle,
    label: "Test",
    description: "Validating product strategies through real-world market application"
  }
];

export const DesignThinkingRibbon = ({ currentStage }: DesignThinkingRibbonProps) => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card/95 backdrop-blur-md border border-border/30 rounded-2xl px-8 py-4 shadow-2xl shadow-black/10">
        <div className="flex items-center gap-8">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = currentStage >= stage.id;
            const isCurrent = currentStage === stage.id;
            
            return (
              <div
                key={stage.id}
                className="relative flex items-center gap-4"
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Stage Icon */}
                <div className={`
                  relative p-3 rounded-full transition-all duration-500 cursor-pointer group
                  ${isActive 
                    ? 'bg-lab-primary/20 text-lab-primary border-2 border-lab-primary/30' 
                    : 'bg-muted/30 text-muted-foreground border-2 border-border/40 hover:bg-muted/50'
                  }
                  ${isCurrent ? 'ring-4 ring-lab-primary/20 scale-125 shadow-lg shadow-lab-primary/25' : ''}
                  ${hoveredStage === stage.id ? 'scale-110' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                  
                  {/* Glow effect for current stage */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-lab-primary/15 animate-pulse" />
                  )}
                  
                  {/* Completion checkmark overlay */}
                  {isActive && !isCurrent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-lab-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Connector line */}
                {index < stages.length - 1 && (
                  <div className={`
                    w-12 h-[3px] rounded-full transition-all duration-700
                    ${currentStage > stage.id 
                      ? 'bg-gradient-to-r from-lab-primary/80 to-lab-primary/60 shadow-sm' 
                      : 'bg-border/30'
                    }
                  `} />
                )}

                {/* Tooltip */}
                {hoveredStage === stage.id && (
                  <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 w-72">
                    <div className="bg-popover/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-2xl animate-fade-in">
                      <div className="text-sm font-semibold text-foreground mb-2 tracking-wide">
                        {stage.label}
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {stage.description}
                      </div>
                      
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-popover/95 border-r border-b border-border/50 rotate-45 -mt-1.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress text */}
        <div className="text-center mt-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-xs text-muted-foreground font-light tracking-wider">
              Design Thinking Journey
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-lab-primary animate-pulse" />
              <div className="text-xs font-medium text-foreground tabular-nums">
                {currentStage}/5
              </div>
            </div>
            {currentStage === 5 && (
              <div className="text-xs text-lab-primary font-medium animate-fade-in">
                ✨ Complete
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
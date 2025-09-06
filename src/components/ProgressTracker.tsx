import { CheckCircle, Circle } from "lucide-react";

interface ProgressTrackerProps {
  total: number;
  explored: number;
}

export const ProgressTracker = ({ total, explored }: ProgressTrackerProps) => {
  const percentage = (explored / total) * 100;

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-3 min-w-[160px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Lab Progress</span>
        <span className="text-xs text-muted-foreground">{explored}/{total}</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-2">
        <div 
          className="bg-glow-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Progress dots */}
      <div className="flex justify-center gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <div key={index} className="w-4 h-4 flex items-center justify-center">
            {index < explored ? (
              <CheckCircle className="w-3 h-3 text-glow-primary" />
            ) : (
              <Circle className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
      
      {explored === total && (
        <div className="text-xs text-glow-primary font-medium text-center mt-1">
          Lab Complete! ✨
        </div>
      )}
    </div>
  );
};
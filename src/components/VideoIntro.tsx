import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onVideoEnd: () => void;
}

export const VideoIntro = ({ onVideoEnd }: VideoIntroProps) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 2 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    onVideoEnd();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Animated intro content */}
      <div className="text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-thin text-white tracking-[0.2em] animate-fade-in-up">
            MASHA'S
          </h1>
          <div className="w-24 h-px bg-white/30 mx-auto" />
          <h2 className="text-xl md:text-2xl font-light text-white/80 tracking-[0.3em] animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            INNOVATION LAB
          </h2>
        </div>
        
        <div className="text-sm text-white/60 font-light tracking-wide animate-fade-in-up" style={{ animationDelay: '1s' }}>
          Exploring the intersection of psychology, technology & business
        </div>

        {/* Auto-advance after 4 seconds */}
        <div className="w-48 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
          <div className="h-full bg-white/50 rounded-full animate-[fadeIn_4s_ease-out_forwards] origin-left scale-x-0"></div>
        </div>
      </div>

      {/* Skip button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm font-light tracking-wider transition-colors duration-300 animate-fade-in"
        >
          SKIP INTRO →
        </button>
      )}

      {/* Auto advance after 5 seconds */}
      <div className="absolute inset-0" onClick={handleSkip} />
      
      {/* Auto advance timer */}
      {setTimeout(() => onVideoEnd(), 5000) && null}
    </div>
  );
};
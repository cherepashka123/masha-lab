import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onVideoEnd: () => void;
}

export const VideoIntro = ({ onVideoEnd }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Show skip button after 2 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    onVideoEnd();
  };

  const handleSkip = () => {
    onVideoEnd();
  };

  const handleVideoError = () => {
    setVideoError(true);
    // Auto-advance after 3 seconds if video fails
    setTimeout(() => onVideoEnd(), 3000);
  };

  if (videoError) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-thin text-white tracking-[0.2em]">
              MASHA'S
            </h1>
            <div className="w-24 h-px bg-white/30 mx-auto" />
            <h2 className="text-xl md:text-2xl font-light text-white/80 tracking-[0.3em]">
              INNOVATION LAB
            </h2>
          </div>
          <div className="text-sm text-white/60 font-light tracking-wide">
            Exploring the intersection of psychology, technology & business
          </div>
        </div>
        
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm font-light tracking-wider transition-colors duration-300"
        >
          ENTER LAB →
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onError={handleVideoError}
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Skip button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm font-light tracking-wider transition-colors duration-300 animate-fade-in bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md"
        >
          SKIP INTRO →
        </button>
      )}

      {/* Click to skip overlay */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={handleSkip}
        title="Click to skip intro"
      />
    </div>
  );
};
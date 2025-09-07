import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onVideoEnd: () => void;
}

export const VideoIntro = ({ onVideoEnd }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Show skip button after 2 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-advance after 8 seconds if video doesn't play
    const autoAdvanceTimer = setTimeout(() => {
      console.log("Auto-advancing after 8 seconds");
      onVideoEnd();
    }, 8000);

    return () => clearTimeout(autoAdvanceTimer);
  }, [onVideoEnd]);

  const handleVideoEnd = () => {
    console.log("Video ended naturally");
    onVideoEnd();
  };

  const handleSkip = () => {
    console.log("User skipped video");
    onVideoEnd();
  };

  const handleVideoError = (e: any) => {
    console.log("Video failed to load:", e);
    console.log("Video src:", videoRef.current?.src);
    setVideoError(true);
    // Auto-advance after 3 seconds if video fails
    setTimeout(() => onVideoEnd(), 3000);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play");
    // Try to play the video
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Failed to autoplay video:", err);
        // If autoplay fails, show skip button immediately
        setShowSkip(true);
      });
    }
  };

  if (videoError) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-12 animate-fade-in px-8">
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-thin text-white tracking-[0.3em] relative">
                MASHA
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
            <h2 className="text-xl md:text-3xl font-extralight text-white/90 tracking-[0.4em]">
              INNOVATION LAB
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-base md:text-lg text-white/70 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
              Exploring the intersection of psychology, technology & business
            </p>
            <p className="text-sm text-white/50 font-light tracking-wide">
              A journey through design thinking & innovation
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 rounded-full bg-white/10" />
            </div>
            <p className="text-xs text-white/40 tracking-wider">
              PREPARING EXPERIENCE
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 group flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all duration-500"
        >
          <span className="text-white/60 group-hover:text-white text-sm font-light tracking-wider">
            ENTER LAB
          </span>
          <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white transition-colors">
            <div className="w-0 h-0 border-l-[6px] border-l-white/60 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent group-hover:border-l-white ml-0.5" />
          </div>
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
        onLoadedData={handleVideoLoaded}
        onCanPlay={handleVideoCanPlay}
        onLoadStart={() => console.log("Video load started")}
        onWaiting={() => console.log("Video waiting for data")}
        onStalled={() => console.log("Video stalled")}
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading indicator */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
            <p className="text-white/60 text-sm tracking-wide">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Skip button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm font-light tracking-wider transition-colors duration-300 animate-fade-in bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md z-10"
        >
          SKIP INTRO →
        </button>
      )}

      {/* Click to skip overlay */}
      <div 
        className="absolute inset-0 cursor-pointer z-0" 
        onClick={handleSkip}
        title="Click to skip intro"
      />
    </div>
  );
};
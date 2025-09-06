import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onVideoEnd: () => void;
}

export const VideoIntro = ({ onVideoEnd }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsEnding(true);
      // Start fade out animation
      setTimeout(() => {
        onVideoEnd();
      }, 2000); // Match CSS animation duration
    };

    const handleCanPlay = () => {
      video.play().catch(console.error);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onVideoEnd]);

  return (
    <div className={`fixed inset-0 z-50 ${isEnding ? 'video-fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        autoPlay
        playsInline
        preload="auto"
      >
        <source src="/intro.mp4" type="video/mp4" />
        {/* Fallback content if video fails to load */}
        <div className="w-full h-full bg-gradient-lab-bg flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-neural bg-clip-text text-transparent mb-4">
              Masha's Innovation Lab
            </h1>
            <p className="text-xl text-muted-foreground">
              Please add your intro.mp4 video to the public folder
            </p>
            <button 
              onClick={onVideoEnd}
              className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Enter the Lab
            </button>
          </div>
        </div>
      </video>
    </div>
  );
};
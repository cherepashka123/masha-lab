import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onVideoEnd: () => void;
}

export const VideoIntro = ({ onVideoEnd }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
      setVideoLoaded(true);
      video.play().catch(() => {
        setVideoError(true);
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [onVideoEnd]);

  // Show fallback if video error or after 3 seconds of no load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoLoaded) {
        setVideoError(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [videoLoaded]);

  return (
    <div className={`fixed inset-0 z-50 ${isEnding ? 'video-fade-out' : ''}`}>
      {!videoError ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          autoPlay
          playsInline
          preload="auto"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="w-full h-full bg-gradient-elegant flex items-center justify-center">
          <div className="text-center fade-in-up">
            <h1 className="text-7xl font-light text-lab-primary mb-6 tracking-wide">
              Masha's Innovation Lab
            </h1>
            <p className="text-xl text-lab-secondary mb-12 font-light">
              Welcome to the interactive experience
            </p>
            <button 
              onClick={onVideoEnd}
              className="px-10 py-4 bg-lab-primary text-white rounded-xl hover:bg-lab-secondary transition-all duration-300 font-light text-lg tracking-wide shadow-lg hover:shadow-xl"
            >
              Enter the Lab
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
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
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">
              Masha's Innovation Lab
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Welcome to the interactive experience
            </p>
            <button 
              onClick={onVideoEnd}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Enter the Lab
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
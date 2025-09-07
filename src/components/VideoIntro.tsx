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

  // Skip video intro completely and go straight to lab
  useEffect(() => {
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 100);
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return null;
};
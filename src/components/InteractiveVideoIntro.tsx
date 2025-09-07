import { useState, useRef, useEffect } from "react";
import { LabObjectData } from "./InnovationLab";

interface InteractiveVideoIntroProps {
  onVideoEnd: () => void;
  onObjectSelect: (objectId: string) => void;
}

interface Hotspot {
  id: string;
  x: string;
  y: string;
  width: string;
  height: string;
  title: string;
}

const hotspots: Hotspot[] = [
  {
    id: "ukraine",
    x: "15%",
    y: "25%", 
    width: "12%",
    height: "15%",
    title: "Ukrainian Heritage"
  },
  {
    id: "nyc",
    x: "70%",
    y: "20%",
    width: "15%",
    height: "18%",
    title: "NYC Life"
  },
  {
    id: "psychology",
    x: "20%",
    y: "60%",
    width: "18%",
    height: "20%",
    title: "Psychology & Philosophy"
  },
  {
    id: "fashion",
    x: "65%",
    y: "65%",
    width: "20%",
    height: "18%",
    title: "Fashion Tech"
  },
  {
    id: "business",
    x: "40%",
    y: "45%",
    width: "20%",
    height: "15%",
    title: "Product & Strategy"
  }
];

export const InteractiveVideoIntro = ({ onVideoEnd, onObjectSelect }: InteractiveVideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoState, setVideoState] = useState<'loading' | 'playing' | 'frozen' | 'error'>('loading');
  const [showHotspots, setShowHotspots] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log("Video loaded successfully");
      setVideoState('playing');
      
      // Try to play
      video.play().catch(err => {
        console.log("Autoplay failed:", err);
        freezeLastFrame();
      });
    };

    const handleEnded = () => {
      console.log("Video ended - freezing last frame");
      freezeLastFrame();
    };

    const handleError = (e: any) => {
      console.log("Video error:", e);
      setVideoState('error');
      // Show static background with hotspots after 2 seconds
      setTimeout(() => {
        setVideoState('frozen');
        setShowHotspots(true);
      }, 2000);
    };

    const handleTimeUpdate = () => {
      // Freeze at last 0.1 seconds
      if (video.duration - video.currentTime <= 0.1) {
        freezeLastFrame();
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const freezeLastFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      video.pause();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth || 1920;
        canvas.height = video.videoHeight || 1080;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }
    
    setVideoState('frozen');
    setTimeout(() => setShowHotspots(true), 1000);
  };

  const handleHotspotClick = (hotspotId: string) => {
    console.log("Hotspot clicked:", hotspotId);
    onObjectSelect(hotspotId);
    onVideoEnd();
  };

  const handleSkip = () => {
    if (videoState === 'playing') {
      freezeLastFrame();
    } else {
      onVideoEnd();
    }
  };

  if (videoState === 'error') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/50 to-background/80 flex flex-col items-center justify-center">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-thin tracking-[0.25em] text-foreground">
            INNOVATION LAB
          </h1>
          <div className="w-32 h-px bg-foreground/30 mx-auto" />
          <p className="text-lg text-muted-foreground font-light tracking-wide">
            Interactive Experience Loading...
          </p>
        </div>
        
        {/* Static hotspots for fallback */}
        <div className="absolute inset-0">
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className="absolute group"
              style={{
                left: hotspot.x,
                top: hotspot.y,
                width: hotspot.width,
                height: hotspot.height,
              }}
              onClick={() => handleHotspotClick(hotspot.id)}
              onMouseEnter={() => setHoveredHotspot(hotspot.id)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              <div className="w-full h-full bg-primary/20 border-2 border-primary/40 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm font-medium text-primary text-center px-2">
                  {hotspot.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-muted-foreground hover:text-foreground text-sm font-light tracking-wider transition-colors duration-300 bg-background/50 backdrop-blur-sm px-6 py-3 rounded-md border border-border/50"
        >
          ENTER LAB →
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      {/* Video element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${videoState === 'frozen' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        muted
        playsInline
        preload="metadata"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Canvas for frozen frame */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover ${videoState === 'frozen' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />

      {/* Loading state */}
      {videoState === 'loading' && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
            <p className="text-white/60 text-sm tracking-wide">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Interactive hotspots */}
      {showHotspots && (
        <div className="absolute inset-0 animate-fade-in">
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className="absolute group transition-all duration-300"
              style={{
                left: hotspot.x,
                top: hotspot.y,
                width: hotspot.width,
                height: hotspot.height,
              }}
              onClick={() => handleHotspotClick(hotspot.id)}
              onMouseEnter={() => setHoveredHotspot(hotspot.id)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {/* Hotspot area */}
              <div className="w-full h-full rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium text-center px-2 drop-shadow-lg">
                    {hotspot.title}
                  </span>
                </div>
              </div>
              
              {/* Pulse indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full animate-pulse" />
            </button>
          ))}
        </div>
      )}

      {/* Instructions */}
      {showHotspots && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center animate-fade-in">
          <p className="text-white/80 text-sm font-light tracking-wide drop-shadow-lg">
            Click on any object to explore
          </p>
        </div>
      )}

      {/* Skip/Continue button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm font-light tracking-wider transition-colors duration-300 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-md border border-white/20"
      >
        {videoState === 'playing' ? 'SKIP TO ROOM →' : 'CONTINUE TO LAB →'}
      </button>
    </div>
  );
};
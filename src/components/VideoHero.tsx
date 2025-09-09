import { useEffect, useRef, useState } from "react";

interface VideoHeroProps {
  scrollY: number;
}

export const VideoHero = ({ scrollY }: VideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().catch(console.error);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  // Calculate parallax effect and floating video effect
  const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
  const videoScale = Math.max(1 - scrollProgress * 0.85, 0.15);
  const videoTransformY = scrollY * 0.4;
  const videoTransformX = scrollProgress > 0.4 ? (scrollProgress - 0.4) * window.innerWidth * 0.7 : 0;
  const overlayOpacity = Math.min(scrollY / (window.innerHeight * 0.7), 1);
  const borderRadius = scrollProgress > 0.2 ? Math.min(scrollProgress * 24, 16) : 0;
  
  // Micro animation for welcome message
  const showWelcome = scrollY > 50 && scrollY < window.innerHeight * 0.3;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background with floating effect */}
      <div 
        className="absolute inset-0 w-full h-full origin-center overflow-hidden"
        style={{
          transform: `translateY(${videoTransformY}px) translateX(${videoTransformX}px) scale(${videoScale})`,
          transition: 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          borderRadius: `${borderRadius}px`,
          filter: scrollProgress > 0.6 ? `blur(${(scrollProgress - 0.6) * 2}px)` : 'none'
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/intro-1.mp4" type="video/mp4" />
        </video>
        
        {/* Video overlay for smooth transition */}
        <div 
          className="absolute inset-0 bg-background transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div 
          className="text-center text-white mix-blend-difference"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(1 - scrollY / (window.innerHeight * 0.6), 0)
          }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Masha's Innovation Lab
          </h1>
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="w-px h-16 bg-white/50 mx-auto animate-pulse" />
            <p className="text-sm tracking-widest mt-4 opacity-60">SCROLL TO EXPLORE</p>
          </div>
          
          {/* Micro animation welcome message */}
          {showWelcome && (
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                animation: 'fade-in 0.8s ease-out forwards'
              }}
            >
              <p className="text-lg tracking-widest text-white/80 animate-pulse">
                welcome to my treehouse
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
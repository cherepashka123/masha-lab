import { useEffect, useRef, useState } from "react";
import { VideoHero } from "@/components/VideoHero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Video Hero Section */}
      <VideoHero scrollY={scrollY} />
      
      {/* About Section */}
      <AboutSection scrollY={scrollY} />
      
      {/* Projects Section */}
      <ProjectsSection scrollY={scrollY} />
    </div>
  );
};

export default Index;
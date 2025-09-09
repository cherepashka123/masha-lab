import { ProjectTile } from "./ProjectTile";

interface ProjectsSectionProps {
  scrollY: number;
}

const professionalProjects = [
  {
    id: "data-dashboard",
    title: "Data Analytics Platform",
    category: "UX Strategy",
    description: "Transforming complex data into intuitive insights",
    image: "/src/assets/data-dashboard.jpg",
    year: "2024"
  },
  {
    id: "fashion-tech",
    title: "Fashion Tech Innovation",
    category: "Product Design",
    description: "Bridging traditional fashion with digital experiences",
    image: "/src/assets/fashion-tech.jpg",
    year: "2023"
  },
  {
    id: "neural-brain",
    title: "Neural Interface Design",
    category: "Research",
    description: "Exploring human-computer interaction through psychology",
    image: "/src/assets/neural-brain.jpg",
    year: "2024"
  }
];

const personalProjects = [
  {
    id: "treehouse",
    title: "Digital Treehouse",
    category: "Interactive Experience",
    description: "A space for reflection and philosophical exploration",
    image: "/src/assets/nyc-hologram.jpg",
    year: "2024"
  },
  {
    id: "constellation",
    title: "Constellation Narratives",
    category: "Experimental",
    description: "Connecting stories through interactive constellations",
    image: "/public/Maria_Cherep_A_glowing_constellation_orb_designed_as_a_website_button,_surreal_3416095e-4f2a-4768-8fd4-854db8f10ddc.png",
    year: "2023"
  },
  {
    id: "ukrainian-stories",
    title: "Cultural Memory Project",
    category: "Social Impact",
    description: "Preserving and sharing Ukrainian cultural narratives",
    image: "/src/assets/ukrainian-flag.jpg",
    year: "2024"
  }
];

export const ProjectsSection = ({ scrollY }: ProjectsSectionProps) => {
  const sectionStart = window.innerHeight * 1.6;
  const titleParallax = Math.max((scrollY - sectionStart) * 0.2, 0);
  const fadeInProgress = Math.max(0, Math.min(1, (scrollY - sectionStart) / (window.innerHeight * 0.3)));

  return (
    <section className="min-h-screen bg-background py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div 
          className="text-center mb-24"
          style={{
            transform: `translateY(${-titleParallax}px)`,
            opacity: fadeInProgress
          }}
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-wide text-foreground mb-8">
            Selected Works
          </h2>
          <div className="w-24 h-px bg-foreground/20 mx-auto" />
        </div>

        {/* Professional Projects */}
        <div className="mb-32">
          <h3 className="text-2xl font-light tracking-widest text-muted-foreground uppercase mb-16 text-center">
            Professional
          </h3>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {professionalProjects.map((project, index) => (
              <ProjectTile 
                key={project.id} 
                project={project} 
                index={index}
                scrollY={scrollY}
                sectionStart={sectionStart + 200}
              />
            ))}
          </div>
        </div>

        {/* Personal Projects */}
        <div>
          <h3 className="text-2xl font-light tracking-widest text-muted-foreground uppercase mb-16 text-center">
            Personal
          </h3>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {personalProjects.map((project, index) => (
              <ProjectTile 
                key={project.id} 
                project={project} 
                index={index}
                scrollY={scrollY}
                sectionStart={sectionStart + 800}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
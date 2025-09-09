import { ProjectTile } from "./ProjectTile";

interface ProjectsSectionProps {
  scrollY: number;
}

const professionalProjects = [
  {
    id: "threadress",
    title: "Threadress",
    category: "Fashion Tech",
    description: "AI-powered fashion discovery platform",
    media: "/A_minimalistic_hyperrealistic_202509091707.mp4",
    type: "video" as const,
    year: "2024"
  },
  {
    id: "neural-research",
    title: "Neural Research",
    category: "Psychology",
    description: "Human-computer interaction research",
    media: null,
    type: "placeholder" as const,
    year: "2024"
  },
  {
    id: "strategy-consulting",
    title: "Strategy Consulting",
    category: "Business",
    description: "Digital transformation consulting",
    media: null,
    type: "placeholder" as const,
    year: "2023"
  }
];

const personalProjects = [
  {
    id: "treehouse-digital",
    title: "Digital Treehouse",
    category: "Interactive Space",
    description: "A philosophical exploration platform",
    media: null,
    type: "placeholder" as const,
    year: "2024"
  },
  {
    id: "ukrainian-narratives",
    title: "Ukrainian Narratives",
    category: "Cultural Heritage",
    description: "Preserving cultural stories and memories",
    media: null,
    type: "placeholder" as const,
    year: "2024"
  },
  {
    id: "constellation-stories",
    title: "Constellation Stories",
    category: "Experimental",
    description: "Interactive storytelling through constellations",
    media: null,
    type: "placeholder" as const,
    year: "2023"
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
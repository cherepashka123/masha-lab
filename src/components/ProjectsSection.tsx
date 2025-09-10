import { ProjectTile } from "./ProjectTile";
import dressxIcon from "@/assets/dressx-logo.png";
import devolatechIcon from "@/assets/devolatech-icon.png";
import dragonCapitalIcon from "@/assets/dragon-capital-icon.png";
import riseBarclaysIcon from "@/assets/barclays-logo.png";
import nyuIcon from "@/assets/nyu-icon.png";
import ukraineUsIcon from "@/assets/ukraine-us-minimal.png";
import nakedConfidenceIcon from "@/assets/naked-confidence-icon.png";
import tabletochkiIcon from "@/assets/tabletochki-icon.png";

interface ProjectsSectionProps {
  scrollY: number;
}

const professionalProjects = [
  {
    id: "dressx",
    title: "DRESSX",
    category: "Fashion Tech",
    description: "Digital fashion platform revolutionizing virtual clothing",
    media: dressxIcon,
    type: "image" as const,
    year: "2024",
    route: "/projects/dressx"
  },
  {
    id: "devolatech",
    title: "DevolaTech",
    category: "Technology",
    description: "Technology consulting and development solutions",
    media: devolatechIcon,
    type: "image" as const,
    year: "2024",
    route: "/projects/devolatech"
  },
  {
    id: "dragon-capital",
    title: "Dragon Capital",
    category: "Finance",
    description: "Investment management and financial services",
    media: dragonCapitalIcon,
    type: "image" as const,
    year: "2023",
    route: "/projects/dragon-capital"
  },
  {
    id: "rise-barclays",
    title: "Rise by Barclays",
    category: "Banking",
    description: "Digital banking innovation and financial solutions",
    media: riseBarclaysIcon,
    type: "image" as const,
    year: "2023",
    route: "/projects/rise-barclays"
  },
  {
    id: "nyu",
    title: "NYU",
    category: "Education",
    description: "Coursework: Tech Product Management, Digital Business Strategy, Management & Organizations, Intro to Marketing, Social Media Strategy, Programming in Python, Statistics",
    media: nyuIcon,
    type: "image" as const,
    year: "2022",
    route: "/projects/nyu"
  }
];

const personalProjects = [
  {
    id: "threadress",
    title: "Threadress",
    category: "Fashion Tech",
    description: "AI-powered fashion discovery and styling platform",
    media: "/A_minimalistic_hyperrealistic_202509091750.mp4",
    type: "video" as const,
    year: "2024",
    route: "/projects/threadress"
  },
  {
    id: "naked-confidence",
    title: "Naked Confidence",
    category: "Perfume Brand",
    description: "Luxury fragrance brand celebrating confidence and self-expression",
    media: "/A_hyperrealistic_cinematic_202509091804-2.mp4",
    type: "video" as const,
    year: "2022",
    route: "/projects/naked-confidence"
  },
  {
    id: "tabletochki",
    title: "Tabletochki",
    category: "Cancer Fund",
    description: "Non-profit organization supporting cancer patients and research",
    media: tabletochkiIcon,
    type: "image" as const,
    year: "2023",
    route: "/projects/tabletochki"
  }
];

export const ProjectsSection = ({ scrollY }: ProjectsSectionProps) => {
  const sectionStart = window.innerHeight * 1.6;
  const titleParallax = Math.max((scrollY - sectionStart) * 0.2, 0);
  const fadeInProgress = Math.max(0, Math.min(1, (scrollY - sectionStart) / (window.innerHeight * 0.3)));

  return (
    <section className="min-h-screen bg-background py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Professional Projects */}
        <div className="mb-40">
          <div 
            className="text-center mb-20"
            style={{
              transform: `translateY(${-titleParallax}px)`,
              opacity: fadeInProgress
            }}
          >
            <h3 className="text-4xl md:text-6xl font-light tracking-wide text-foreground mb-4">
              Professional
            </h3>
            <div className="w-16 h-px bg-foreground/20 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-16">
            {professionalProjects.map((project, index) => (
              <ProjectTile 
                key={project.id} 
                project={project} 
                index={index}
                scrollY={scrollY}
                sectionStart={sectionStart + (index * 150)}
              />
            ))}
          </div>
        </div>

        {/* Personal Projects */}
        <div>
          <div 
            className="text-center mb-20"
            style={{
              transform: `translateY(${-titleParallax * 0.8}px)`,
              opacity: Math.max(0, Math.min(1, (scrollY - sectionStart - 1200) / (window.innerHeight * 0.3)))
            }}
          >
            <h3 className="text-4xl md:text-6xl font-light tracking-wide text-foreground mb-4">
              Personal
            </h3>
            <div className="w-16 h-px bg-foreground/20 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-16">
            {personalProjects.map((project, index) => (
              <ProjectTile 
                key={project.id} 
                project={project} 
                index={index}
                scrollY={scrollY}
                sectionStart={sectionStart + 1400 + (index * 150)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
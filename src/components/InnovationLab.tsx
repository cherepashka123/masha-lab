import { useState } from "react";
import { LabObject } from "./LabObject";
import { ChatModal } from "./ChatModal";
import { ThemeToggle } from "./ThemeToggle";
import { ProgressTracker } from "./ProgressTracker";
import nycHologram from "@/assets/nyc-hologram.jpg";
import neuralBrain from "@/assets/neural-brain.jpg";
import fashionTech from "@/assets/fashion-tech.jpg";
import dataDashboard from "@/assets/data-dashboard.jpg";
import ukrainianFlag from "@/assets/ukrainian-flag.jpg";

export interface LabObjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  position: { x: string; y: string };
  theme: string;
}

const labObjects: LabObjectData[] = [
  {
    id: "ukraine",
    title: "Cultural Identity",
    description: "Ukrainian heritage, resilience, and roots",
    image: ukrainianFlag,
    position: { x: "10%", y: "20%" },
    theme: "ukraine"
  },
  {
    id: "nyc",
    title: "NYC Life & Studies",
    description: "Life, studies, and career in New York",
    image: nycHologram,
    position: { x: "70%", y: "15%" },
    theme: "nyc"
  },
  {
    id: "fashion",
    title: "Fashion Tech",
    description: "DRESSX, Threadress, Naked Confidence projects",
    image: fashionTech,
    position: { x: "15%", y: "65%" },
    theme: "fashion"
  },
  {
    id: "psychology",
    title: "Psychology & Philosophy",
    description: "Mind, empathy, and human understanding",
    image: neuralBrain,
    position: { x: "75%", y: "70%" },
    theme: "psychology"
  },
  {
    id: "business",
    title: "Product & Strategy",
    description: "Product management, strategy, and finance",
    image: dataDashboard,
    position: { x: "45%", y: "40%" },
    theme: "business"
  }
];

export const InnovationLab = () => {
  const [selectedObject, setSelectedObject] = useState<LabObjectData | null>(null);
  const [exploredObjects, setExploredObjects] = useState<Set<string>>(new Set());

  const handleObjectClick = (object: LabObjectData) => {
    setSelectedObject(object);
    setExploredObjects(prev => new Set([...prev, object.id]));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 border-b border-border/20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-thin tracking-[0.15em] text-foreground">
              INNOVATION LAB
            </h1>
            <div className="w-24 h-px bg-foreground/20 mx-auto" />
            <p className="text-lg text-muted-foreground font-light leading-relaxed tracking-wide">
              Exploring the intersection of psychology, technology & business strategy
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-8 mt-12">
            <ProgressTracker 
              total={labObjects.length} 
              explored={exploredObjects.size} 
            />
            <ThemeToggle />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {labObjects.map((object, index) => (
            <LabObject
              key={object.id}
              object={object}
              isExplored={exploredObjects.has(object.id)}
              onClick={() => handleObjectClick(object)}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* Chat Modal */}
      {selectedObject && (
        <ChatModal
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
};
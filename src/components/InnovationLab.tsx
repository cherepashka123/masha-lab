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
    <div className="fixed inset-0 bg-gradient-lab-bg lab-fade-in overflow-hidden">
      {/* Header with controls */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-neural bg-clip-text text-transparent mb-2">
            Masha's Innovation Lab
          </h1>
          <p className="text-sm text-muted-foreground">
            Tap a glowing object to explore
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressTracker 
            total={labObjects.length} 
            explored={exploredObjects.size} 
          />
          <ThemeToggle />
        </div>
      </div>

      {/* Lab Objects */}
      <div className="relative w-full h-full">
        {labObjects.map((object) => (
          <LabObject
            key={object.id}
            object={object}
            isExplored={exploredObjects.has(object.id)}
            onClick={() => handleObjectClick(object)}
          />
        ))}
      </div>

      {/* Chat Modal */}
      {selectedObject && (
        <ChatModal
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}

      {/* Ambient particles/effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-glow-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-glow-secondary rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-glow-accent rounded-full animate-pulse opacity-50" />
      </div>
    </div>
  );
};
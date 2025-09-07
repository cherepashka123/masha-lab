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
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Farfetch-inspired header */}
      <header className="relative z-10 py-12 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-light text-foreground tracking-wide">
                Masha's Innovation Lab
              </h1>
              <p className="text-sm text-muted-foreground font-light mt-2">
                Psychology × Technology × Strategy
              </p>
            </div>
            <div className="flex items-center gap-6">
              <ProgressTracker total={labObjects.length} explored={exploredObjects.size} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main grid layout - Farfetch style */}
      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
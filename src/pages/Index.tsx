import { useState, useEffect } from "react";
import { InteractiveVideoIntro } from "@/components/InteractiveVideoIntro";
import { InnovationLab } from "@/components/InnovationLab";

const Index = () => {
  const [showLab, setShowLab] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const handleObjectSelect = (objectId: string) => {
    setSelectedObjectId(objectId);
  };

  return (
    <>
      {!showLab && (
        <InteractiveVideoIntro 
          onVideoEnd={() => setShowLab(true)} 
          onObjectSelect={handleObjectSelect}
        />
      )}
      {showLab && <InnovationLab preselectedObjectId={selectedObjectId} />}
    </>
  );
};

export default Index;

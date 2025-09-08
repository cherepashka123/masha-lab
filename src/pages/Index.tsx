import { useState, useEffect } from "react";
import { InteractiveVideoIntro } from "@/components/InteractiveVideoIntro";
import { InnovationLab } from "@/components/InnovationLab";
import { TreehouseChatbot } from "@/components/TreehouseChatbot";

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
      <TreehouseChatbot />
    </>
  );
};

export default Index;

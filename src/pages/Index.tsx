import { useState } from "react";
import { InteractiveVideoIntro } from "@/components/InteractiveVideoIntro";
import { TreehouseLadder } from "@/components/TreehouseLadder";
import { TreehouseChatbot } from "@/components/TreehouseChatbot";

const Index = () => {
  const [showLadder, setShowLadder] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      {!showLadder && (
        <InteractiveVideoIntro 
          onVideoEnd={() => setShowLadder(true)} 
          onObjectSelect={() => {}} // No longer needed
        />
      )}
      {showLadder && <TreehouseLadder onOpenChat={handleOpenChat} />}
      {isChatOpen && <TreehouseChatbot />}
    </>
  );
};

export default Index;

import { useState } from "react";
import { VideoIntro } from "@/components/VideoIntro";
import { InnovationLab } from "@/components/InnovationLab";

const Index = () => {
  const [showLab, setShowLab] = useState(false);

  return (
    <>
      {!showLab && <VideoIntro onVideoEnd={() => setShowLab(true)} />}
      {showLab && <InnovationLab />}
    </>
  );
};

export default Index;

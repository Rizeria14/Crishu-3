import { useState } from "react";
import EnvelopeIntro from "./components/EnvelopeIntro.jsx";
import ChapterNav from "./components/ChapterNav.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import TheBeginning from "./sections/TheBeginning.jsx";
import InteractiveBook from "./sections/InteractiveBook.jsx";
import FlowerGarden from "./sections/FlowerGarden.jsx";
import MemoryFilmStrip from "./sections/MemoryFilmStrip.jsx";
import Constellation from "./sections/Constellation.jsx";
import LockedLetterScene from "./sections/LockedLetterScene.jsx";
import FinalScene from "./sections/FinalScene.jsx";
import { musicPlayer } from "./data/content.js";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative">
      {!opened && <EnvelopeIntro onOpen={() => setOpened(true)} />}

      <main className="relative">
        <TheBeginning />
        <InteractiveBook />
        <FlowerGarden />
        <MemoryFilmStrip />
        <Constellation />
        <LockedLetterScene />
        <FinalScene />
      </main>

      {opened && <ChapterNav />}
      {opened && <MusicPlayer {...musicPlayer} />}
    </div>
  );
}

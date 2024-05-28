import { useState } from "react";
import Graph from "../components/Graph";
import List from "../components/List";
import CharacterDetails from "../components/CharacterDetails";

const Home = () => {
  const [comicId, setComicId] = useState<string | null>(null);
  const [characterId, setCharacterId] = useState<string | null>(null);

  const handleComicSelection = (id: string) => {
    setComicId(id);
    setCharacterId(null);
  };

  const handleCharacterSelection = (id: string) => {
    setCharacterId(id);
  };

  return (
    <div className="h-full flex text-black">
      <div className="w-[450px]">
        <h1 className="">Marvel Characters</h1>
        {!characterId ? (
          <div>Select a Character</div>
        ) : (
          <CharacterDetails id={characterId} />
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {!comicId ? (
          <h1 className="text-2xl">Select a Comic to load graph</h1>
        ) : (
          <Graph
            comicId={comicId}
            handleCharacterSelection={handleCharacterSelection}
          />
        )}
      </div>
      <div className="w-[650px] overflow-y-auto max-h-screen pb-60">
        <h1 className="">Comics</h1>
        <div>Click a Comic</div>
        <List handleComicSelection={handleComicSelection} />
      </div>
    </div>
  );
};

export default Home;

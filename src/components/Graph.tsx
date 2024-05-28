import { useQuery } from "@tanstack/react-query";
import ForceGraph2D from "react-force-graph-2d";
import { fetchComicCharacters } from "../utils/api";

interface GraphProps {
  comicId: string;
  handleCharacterSelection: (id: string) => void;
}

const createLinks = (characters) => {
  const links = [];
  characters.forEach((character, i) => {
    for (let j = i + 1; j < characters.length; j++) {
      links.push({
        source: character.name,
        target: characters[j].name,
      });
    }
  });
  return links;
};

const Graph = ({ comicId, handleCharacterSelection }: GraphProps) => {
  console.log("🚀 ~ Graph ~ comicId:", comicId);
  const { data, isLoading, error } = useQuery({
    queryKey: ["comicCharacters", comicId],
    queryFn: () => fetchComicCharacters(comicId),
  });

  if (isLoading) return <div>"Loading..."</div>;
  if (error) return "An error has occurred: " + error.message;

  const characters = data?.data?.results || [];
  console.log("🚀 ~ Graph ~ characters:", characters);
  const formattedCharacters = characters?.map((character: any) => ({
    id: character.name,
    group: 1,
    characterid: character.id,
  }));
  const links = createLinks(characters);

  const graphData = {
    nodes: formattedCharacters,
    links: links,
  };

  if (!characters || characters.length === 0)
    return <div>There is no Characters in this comic</div>;

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeAutoColorBy="group"
      onNodeClick={(node) => {
        console.log("🚀 ~ Graph ~ node:", node);
        handleCharacterSelection(node.characterid);
      }}
      width={800}
      height={800}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(
          (n) => n + fontSize * 0.2
        ); // some padding

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 2,
          ...bckgDimensions
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions &&
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );
      }}
    />
  );
};

export default Graph;

import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../utils/api";

const CharacterDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comicCharacters", id],
    queryFn: () => fetchCharacter(id),
  });

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  const character = data?.data.results[0];
  if (!character) return "Character not found";

  console.log("🚀 ~ CharacterDetails ~ character:", character);
  const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <div>
        <img
          src={thumbnail}
          alt={character?.name}
          className="w-64 h-64 object-cover rounded-full"
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{character?.name}</h1>
      <p className="text-gray-700 mt-2">{character?.description}</p>
      {/* Render other character details here */}
    </div>
  );
};

export default CharacterDetails;

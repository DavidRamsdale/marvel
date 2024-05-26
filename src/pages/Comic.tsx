import { useQuery } from "@tanstack/react-query";
import { fetchComicCharacters } from "../utils/api";
import { useParams } from "react-router-dom";

function Comic() {
  const { id = "asdasd" } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["comicCharacters", id],
    queryFn: () => fetchComicCharacters(id),
  });

  console.log("🚀 ~ Comic ~ data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  // Render your data
  return <div>works</div>;
}

export default Comic;

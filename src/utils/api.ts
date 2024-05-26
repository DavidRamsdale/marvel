import axios from "axios";
import md5 from "md5";

const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

const generateHash = (timeStamp: number) => {
  return md5(timeStamp + privateKey + publicKey);
};

const generateAPIURL = (url: string) => {
  const timeStamp = new Date().getTime();
  const hash = generateHash(timeStamp);

  return `${url}?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;
};

const fetchData = async (endpoint: string, params = {}) => {
  const url = generateAPIURL(
    `https://gateway.marvel.com/v1/public/${endpoint}`
  );
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error; // re-throw the error so it can be handled upstream
  }
};

export const fetchComicCharacters = async (id: string) => {
  return fetchData(`comics/${id}/characters`);
};

export const fetchComics = async ({ pageParam = 0 }) => {
  return fetchData("comics", { limit: 20, offset: pageParam });
};

import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  image: string;
  id: string;
}

const Card = ({ title, description, image, id }: CardProps) => {
  return (
    <Link to={`/comic/${id}`}>
      <div
        className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-3 hover:shadow-lg relative h-64"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-30 w-full h-full absolute">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-white mt-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

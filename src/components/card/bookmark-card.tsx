import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { GlassesItem } from "@/types/glasses";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface CardProps {
  data: GlassesItem;
}

const BookmarkCard = ({ data }: CardProps) => {
  const { name, description, image } = data;
  const { toggleFavorite } = useFavoriteGlassesStore();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-6 border-b border-gray-300">
        <div className="flex items-center flex-grow">
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="rounded-xl"
          />
          <div className="pl-6">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-gray-500 font-medium text-base">{description}</p>
          </div>
        </div>

        <button onClick={() => toggleFavorite(data)} className="ml-auto px-4">
          <RiDeleteBin6Fill
            size={20}
            className="text-black hover:text-gray-400"
          />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;

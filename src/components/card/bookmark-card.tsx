import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface CardProps {
  data: AlgoliaProduct;
}

const BookmarkCard = ({ data }: CardProps) => {
  const { name, imageUrlBase, brand, description } = data;
  const { toggleFavorite } = useFavoriteGlassesStore();

  return (
    <div className="flex flex-col">
      <div className="flex items-center  justify-between pb-6 border-b border-gray-300">
        <Image
          src={imageUrlBase ?? ""}
          alt={name}
          width={80}
          height={80}
          className="rounded-xl shadow-md object-cover"
          style={{ width: "80px", height: "80px" }}
        />

        <div className="pl-6">
          <p className="font-bold text-lg">{brand}</p>
          <p className="text-gray-500 font-medium text-base">{description}</p>
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

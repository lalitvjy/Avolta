"use client";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { GlassesItem } from "@/types/glasses";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

interface CardProps {
  data: GlassesItem;
  index: number;
  totalItems: number;
}

const CatalogCard = ({ data, index, totalItems }: CardProps) => {
  const { name, description, image, price, id } = data;
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const isFavorite = favorites.some((item) => item.id === id);

  const isFirstRow = index < 2;
  const isLastRow = index >= totalItems - 2;
  const isLeftColumn = index % 2 === 0;
  const isRightColumn = index % 2 === 1;

  const recommendedIds = [
    "ac16aaf7-1df1-4453-b1e7-fd1a6b0ba76c",
    "cd9abfcb-f7a4-4ff8-86dd-f6696ddd5d42",
    "47b7d22a-ca16-41ee-b965-6759b2317178",
    "425b6732-5850-4510-ab24-25085baf1aed",
  ];
  const newItem = [
    "b6d6c216-b3fc-42e8-bdf8-452afe8032d4",
    "6a0cf492-5c20-43e7-933d-1304cb344feb",
  ];

  const isRecommended = recommendedIds.includes(id);
  const isNew = newItem.includes(id);

  return (
    <div
      className={` px-10 pt-6 pb-5 border-gray-300 min-h-[410px] flex flex-col justify-between 
        ${isFirstRow ? "" : ""} 
        ${isLastRow ? "rounded-b-3xl" : ""} 
        ${isLeftColumn ? "border-b border-r" : ""} 
        ${isRightColumn ? "border-b" : ""}`}
    >
      <div className=" flex ">
        {isRecommended && (
          <div className=" bg-orange text-white text-xs px-3 py-2 rounded-full font-bold">
            Recommended
          </div>
        )}
      </div>
      <div className=" flex ">
        {isNew && (
          <div className="bg-black text-white text-xs px-3 py-2 rounded-full font-bold">
            New
          </div>
        )}
      </div>

      <div className="relative w-full h-48 flex-shrink-0">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>

      <div className=" text-grayscale600 pt-2 flex flex-col ">
        <h2 className="font-bold text-sm">{name}</h2>
        <p className="font-medium text-base flex-grow">{description}</p>
        <div className="flex items-center justify-between ">
          <p className="font-bold text-lg">CHF {price}</p>
          <button onClick={() => toggleFavorite(data)}>
            {isFavorite ? (
              <>
                <FaHeart size={20} className="text-red" />
              </>
            ) : (
              <>
                <CiHeart className="text-gray400" size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;

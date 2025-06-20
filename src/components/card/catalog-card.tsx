"use client";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import { logWishlistAdd, logWishlistRemove } from "@/utils/analytics";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

interface CardProps {
  data: AlgoliaProduct;
  index: number;
  totalItems: number;
}

const CatalogCard = ({ data, index }: CardProps) => {
  const { name, imageUrlBase, priceDutyFree, objectID, currency, brand } = data;
  const { favorites, toggleFavorite } = useFavoriteGlassesStore();
  const isFavorite = favorites.some((item) => item.objectID === objectID);

  const isFirstRow = index < 2;
  // const isLastRow = index >= totalItems - 2;
  // const isLeftColumn = index % 2 === 0;
  // const isRightColumn = index % 2 === 1;

  const recommendedIds = [
    "VAN-4001225",
    "889652205076",
    "889652203638",
    "889652188621",
  ];

  const newItem = ["889652051208", "8053672789775"];

  const isRecommended = recommendedIds.includes(objectID);
  const isNew = newItem.includes(objectID);

  return (
    <div
      className={` px-10 pt-6 pb-5 border-gray-300 min-h-[410px] flex flex-col justify-between  border-r border-b
     ${isFirstRow ? "border-b" : ""} `}
    >
      <div className=" flex pb-4">
        {isRecommended && (
          <div className=" bg-orange text-white text-xs px-3 py-2 rounded-full font-bold">
            Recommended
          </div>
        )}
      </div>
      <div className=" flex pb-4 ">
        {isNew && (
          <div className="bg-black text-white text-xs px-3 py-2 rounded-full font-bold">
            New
          </div>
        )}
      </div>

      <div className="relative w-[460px] h-[330px] flex self-center">
        {imageUrlBase ? (
          <Image
            src={imageUrlBase ?? ""}
            alt={name}
            fill
            style={{ objectFit: "contain" }}
            priority={index === 0}
          />
        ) : (
          <div className="flex justify-center items-center ">No Image</div>
        )}
      </div>

      <div className=" text-grayscale600 pt-2 flex flex-col gap-3">
        <h2 className="font-bold text-4xl">{brand}</h2>
        <h2 className="font-medium text-3xl">{name}</h2>
        <div className="flex items-center justify-between ">
          <p className="font-bold text-4xl">
            {currency}
            {priceDutyFree}
          </p>
          <button
            onClick={() => {
              toggleFavorite(data);
              if (isFavorite) {
                logWishlistRemove("catalogue-plp");
              } else {
                logWishlistAdd("catalogue-plp");
              }
            }}
          >
            {isFavorite ? (
              <FaHeart size={30} className="text-red" />
            ) : (
              <CiHeart className="text-gray400" size={30} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;

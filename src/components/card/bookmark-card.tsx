import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface CardProps {
  data: AlgoliaProduct;
}

const BookmarkCard = ({ data }: CardProps) => {
  const { name, imageUrlBase, brand, priceDutyFree, currency, objectID } = data;
  const { toggleFavorite } = useFavoriteGlassesStore();

  return (
    <div className="flex flex-col">
      <div className="flex items-center  justify-between pb-2 border-b border-gray-300">
        <Image
          src={imageUrlBase ?? ""}
          alt={name}
          width={150}
          height={150}
          className="rounded-xl  object-cover"
          style={{ width: "150px", height: "150px" }}
        />

        <div className="pl-2">
          <p className="font-bold text-2xl">{brand}</p>
          <p className="text-gray-500 font-medium text-xl">
            {currency}
            {priceDutyFree}
          </p>
          <p className="text-gray-500 font-medium text-xl">{objectID}</p>
        </div>
        <button onClick={() => toggleFavorite(data)} className="ml-auto px-2">
          <RiDeleteBin6Fill size={32} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;

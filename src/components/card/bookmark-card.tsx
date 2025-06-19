import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useUserInfo } from "@/store/useUserInfo";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import { logWishlistDelete } from "@/utils/analytics";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface CardProps {
  data: AlgoliaProduct;
}

const BookmarkCard = ({ data }: CardProps) => {
  const { name, imageUrlBase, brand, priceDutyFree, currency, objectID, sku } =
    data;
  const { email, name: userName } = useUserInfo();
  const { toggleFavorite } = useFavoriteGlassesStore();
  const handleDelete = () => {
    toggleFavorite(data);
    if (sku) {
      logWishlistDelete(sku, email, userName);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center  justify-between pb-6 border-b border-gray-300">
        <Image
          src={imageUrlBase ?? ""}
          alt={name}
          width={300}
          height={300}
          className="rounded-xl  object-cover"
          style={{ width: "300px", height: "300px" }}
        />

        <div className="pl-10">
          <p className="font-bold text-4xl">{brand}</p>
          <p className="text-gray-500 font-medium text-3xl">
            {currency}
            {priceDutyFree}
          </p>
          <p className="text-gray-500 font-medium text-3xl">{objectID}</p>
        </div>
        <button onClick={handleDelete} className="ml-auto px-4">
          <RiDeleteBin6Fill size={48} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;

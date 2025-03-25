import { useBookmarkModalStore } from "@/store/useBookmarkModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { FaHeart } from "react-icons/fa";
import Button from "../button/button";
const Header = () => {
  const { openBookmarkModal } = useBookmarkModalStore();
  const { favorites } = useFavoriteGlassesStore();
  return (
    <div className="flex justify-end ">
      <div className="flex items-center gap-3.5">
        <Button
          label="Club Avolta"
          rounded
          variant="secondary"
          className="font-bold py-4 px-6 text-4xl"
        />
        <button
          onClick={openBookmarkModal}
          className="bg-white  rounded-full flex items-center gap-x-8 py-4 px-6 border"
        >
          <FaHeart className="text-red" size={40} />
          <div className="bg-softPink  rounded-full p-3">
            <p className="text-deepRed text-3xl leading-4 font-bold">
              {favorites.length}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;

import { useBookmarkModalStore } from "@/store/useBookmarkModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import Logo from "../../../public/logo.svg";
import Button from "../button/button";
const Header = () => {
  const router = useRouter();
  const handelHomeClick = () => {
    router.push("/");
  };

  const { openBookmarkModal } = useBookmarkModalStore();
  const { favorites } = useFavoriteGlassesStore();
  return (
    <div className="flex justify-between ">
      <Image
        src={Logo}
        width={180}
        alt="logo"
        onClick={handelHomeClick}
        className="cursor-pointer"
      />
      <div className="flex items-center gap-3.5">
        <Button
          label="Club Avolta"
          rounded
          variant="secondary"
          className="font-bold py-4 px-6"
        />
        <button
          onClick={openBookmarkModal}
          className="bg-white  rounded-full flex items-center gap-x-2 p-4 "
        >
          <FaHeart className="text-red" size={20} />
          <div className="bg-softPink  rounded-3xl px-2">
            <p className="text-deepRed text-sm leading-4 font-bold">
              {favorites.length}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;

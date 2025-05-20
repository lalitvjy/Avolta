import { useBookmarkModalStore } from "@/store/useBookmarkModal";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";// import LogoVideo from "../../../public/logo_club_avolta.mp4";
import { resetUserFlow } from "@/utils/resetUserFlow";

const Header = () => {
  const { openBookmarkModal } = useBookmarkModalStore();

  const { favorites } = useFavoriteGlassesStore();
  const router = useRouter();
  const handelNavigateHomePage = () => {
    router.push("/");
    resetUserFlow();
  };
  return (
    <div className="flex items-center gap-3.5 justify-between">
      {/* <Button
        label="Club Avolta"
        rounded
        onClick={handelNavigateHomePage}
        variant="secondary"
        className="font-bold py-12 px-12 text-4xl"
      /> */}
      <video
        src="/logo_club_avolta.mp4"
        width={300}
        height={200}
        onClick={handelNavigateHomePage}
        autoPlay
        loop
        muted
      />
      <button
        onClick={openBookmarkModal}
        className="bg-white  rounded-full flex items-center gap-x-6 py-4 px-4 text-xl border-2  "
      >
        <FaHeart className="text-red" size={32} />
        <p className="text-black  font-bold"> Wishlist</p>
        <div className="bg-softPink  rounded-full ">
          <p className="text-deepRed  leading-4 font-bold">
            {favorites.length}
          </p>
        </div>
      </button>
    </div>
  );
};

export default Header;

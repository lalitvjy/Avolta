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
  const { favorites } = useFavoriteGlassesStore();
  return (
    <div className="flex justify-between px-8">
      <Image
        src={Logo}
        width={130}
        alt="logo"
        onClick={handelHomeClick}
        className="cursor-pointer"
      />
      <div className="flex items-center gap-2">
        <Button
          label="Club Avolta"
          rounded
          variant="secondary"
          className="font-bold"
        />
        <div className="bg-white px-6 py-2.5 rounded-full flex items-center gap-2">
          <FaHeart className="text-red-600" />
          <div className="bg-softPink  rounded-3xl px-2">
            <p className="text-deepRed text-sm leading-4 font-bold">
              {favorites.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

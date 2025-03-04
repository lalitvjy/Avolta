"use client";
import Button from "@/components/button/button";
import BookmarkCard from "@/components/card/bookmark-card";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { FaBookmark } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const Bookmar = () => {
  const { favorites } = useFavoriteGlassesStore();

  return (
    <div className="flex-1 px-16 py-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-extrabold text-4xl">Your Bookmars</h1>
          <p className="font-medium text-base mt-2">
            Lorem ipsum simply dummy text
          </p>
        </div>
        <FaBookmark size={48} className="text-primaryAvolta" />
      </div>
      <div className="mt-6 grid grid-cols-1  gap-y-4  ">
        {favorites.map((item) => (
          <BookmarkCard
            key={item.id}
            data={{
              name: item.name,
              description: item.description,
              price: item.price,
              image: item.image,
              id: item.id,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10 ">
        <Button
          label="Email"
          rounded
          leftIcon={<MdOutlineEmail />}
          className="w-full bg-transparent border"
        />
      </div>
    </div>
  );
};

export default Bookmar;

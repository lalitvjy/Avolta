import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import Image from "next/image";
import { useRef } from "react";

const ReceiveSelfieSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { recommendations } = useRecommendetGlassStore();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!sliderRef.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > 50) {
      sliderRef.current.scrollBy({ left: 800, behavior: "smooth" });
    } else if (swipeDistance < -50) {
      sliderRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden h-full">
      <div
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-3 pl-[17.5%] pr-8"
      >
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[65%] h-[400px] flex justify-center relative"
          >
            {item.triedOnUrl ? (
              <Image
                src={item.triedOnUrl}
                alt={item.name || `Favorite Glasses ${index + 1}`}
                width={900}
                height={1000}
                className="rounded-56px object-cover h-full w-auto"
              />
            ) : (
              <div className="text-gray-400 text-center">
                No image available
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiveSelfieSlider;

import Image from "next/image";
import { useRef } from "react";
import Mainimage2 from "../../../../../public/Image 4.jpg";
import Mainimage from "../../../../../public/image 3.jpg";

const images = [Mainimage, Mainimage2];

const ReceiveSelfieSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    } else if (swipeDistance < -50) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full  flex items-center justify-center overflow-hidden"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex justify-center"
          >
            <Image
              src={image}
              alt={`slider-image-${index}`}
              width={900}
              height={400}
              className="rounded-56px object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiveSelfieSlider;

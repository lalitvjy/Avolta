import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import Image from "next/image";

const Product = () => {
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <div className="p-4 flex items-center gap-4 rounded-3xl  shadow-lg bg-white border">
      <Image
        src={selectedGlasses?.image ?? ""}
        width={100}
        height={100}
        alt={selectedGlasses?.name ?? ""}
        className="rounded-3xl"
      />
      <div>
        <p>{selectedGlasses?.name}</p>
        <p>{selectedGlasses?.description}</p>
      </div>
    </div>
  );
};

export default Product;

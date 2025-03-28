import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import Image from "next/image";

const Product = () => {
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <div className="p-6 flex items-center gap-4 rounded-3xl  shadow-lg bg-white border">
      <Image
        src={selectedGlasses?.imageUrlBase ?? ""}
        width={200}
        height={200}
        alt={selectedGlasses?.name ?? ""}
        className="rounded-3xl"
      />
      <div className="space-y-4">
        <p className="text-black text-4xl">{selectedGlasses?.name}</p>
        <p className="text-gray500 text-2xl">{selectedGlasses?.objectID}</p>
        <p className="text-gray500 text-3xl">
          {selectedGlasses?.currency}
          {selectedGlasses?.priceDutyFree}
        </p>
      </div>
    </div>
  );
};

export default Product;

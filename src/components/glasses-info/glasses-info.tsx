import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";

const GlassesInfo = () => {
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <div className="text-white font-bold flex flex-col gap-y-2.5">
      <p className="text-4xl ">{selectedGlasses?.brand}</p>
      <p className="text-3xl font-medium">{selectedGlasses?.objectID}</p>
      <p className="text-3xl ">
        {selectedGlasses?.currency}
        {selectedGlasses?.priceDutyFree}
      </p>
    </div>
  );
};

export default GlassesInfo;

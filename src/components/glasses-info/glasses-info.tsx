import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";

const GlassesInfo = () => {
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <div className="text-white font-bold flex flex-col gap-y-2.5">
      <p className="text-xl ">{selectedGlasses?.brand}</p>
      <p className="text-base font-medium">{selectedGlasses?.objectID}</p>
      <p className="text-xl ">
        {selectedGlasses?.currency}
        {selectedGlasses?.priceDutyFree}
      </p>
    </div>
  );
};

export default GlassesInfo;

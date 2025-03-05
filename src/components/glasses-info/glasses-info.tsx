import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";

const GlassesInfo = () => {
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <div className="text-white font-bold flex flex-col gap-y-2.5">
      <p className="text-xl ">{selectedGlasses?.name}</p>
      <p className="text-base font-medium">{selectedGlasses?.id}</p>
      <p className="text-xl ">CHF{selectedGlasses?.price}</p>
    </div>
  );
};

export default GlassesInfo;

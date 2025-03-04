import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";

const GlassesInfo = () => {
  const { selectedGlasses } = useSelectedGlassesStore();
  return (
    <div className="text-white font-bold">
      <p className="text-xl leading-7">{selectedGlasses?.name}</p>
      <p className="text-base leading-5">{selectedGlasses?.id}</p>
      <p className="text-xl leading-7">CHF{selectedGlasses?.price}</p>
    </div>
  );
};

export default GlassesInfo;

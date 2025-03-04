import { useFilterStore } from "@/store/useFilter";
import Image from "next/image";
import FilterIcon from "../../../public/ic-filter.svg";
import Button from "../button/button";
const CatalogHeadder = () => {
  const { openFilter } = useFilterStore();
  return (
    <div className="mt-10">
      <Button
        label="Filter"
        rounded
        variant="secondary"
        className="bg-black font-bold"
        onClick={openFilter}
        leftIcon={
          <Image src={FilterIcon} width={20} height={20} alt="filter icon" />
        }
      />
    </div>
  );
};

export default CatalogHeadder;

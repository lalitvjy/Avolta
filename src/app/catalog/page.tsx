"use client";
import CatalogHeadder from "@/components/catalog-header/catalog-header";
import Filter from "@/components/filter/filter";
import { GlassesItem } from "@/types/glasses";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import CatalogCard from "../../components/card/catalog-card";
import catalog from "../../utils/glasses.json";
const Catalog = () => {
  const glassesCatalog: GlassesItem[] = catalog;
  const router = useRouter();
  const handelNavigateHome = () => {
    router.push("/avolta");
  };
  return (
    <div className="px-12 py-10 bg-white">
      <button
        className="absolute top-0 right-10 p-4 rounded-b-full bg-primaryL1"
        onClick={handelNavigateHome}
      >
        <p className="bg-white p-4 rounded-full">
          <RxCross1 className="text-black" size={24} />
        </p>
      </button>
      <h1 className="text-grayscale600 font-bold text-5xl ">Catalogue</h1>
      <CatalogHeadder />
      <Filter />
      <div className="mt-6 grid grid-cols-2 border  rounded-3xl ">
        {glassesCatalog.map((item, index) => (
          <CatalogCard
            key={item.id}
            data={{
              name: item.name,
              description: item.description,
              price: item.price,
              image: item.image,
              id: item.id,
            }}
            index={index}
            totalItems={glassesCatalog.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;

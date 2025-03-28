"use client";
import CatalogHeadder from "@/components/catalog-header/catalog-header";
import Filter from "@/components/filter/filter";
import { fetchGlasses } from "@/helpers/algolia/algolia";
import { useDetailModalStore } from "@/store/useDetailModal";
import { useFilterStore } from "@/store/useFilter";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import CatalogCard from "../../components/card/catalog-card";
import DetailModal from "../../components/modals/detail-modal/detail";
const Catalog = () => {
  const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;
  const { filters, sortOrder, setSortOrder } = useFilterStore();
  const [glasses, setGlasses] = useState<AlgoliaProduct[]>([]);
  const { setSelectedGlasses } = useSelectedGlassesStore();
  const { openDetailModal } = useDetailModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [nbPages, setNbPages] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push("/avolta");
  };

  useEffect(() => {
    const loadData = async () => {
      if (page >= nbPages) return;
      setIsLoading(true);
      try {
        const data = await fetchGlasses<AlgoliaProduct>(
          ALGOLIA_INDEX_NAME,
          "",
          page,
          filters,
          sortOrder || undefined
        );

        setGlasses((prevGlasses) => {
          if (page === 0) {
            return data.hits;
          }
          const newItems = data.hits.filter(
            (item) =>
              !prevGlasses.some(
                (existing) => existing.objectID === item.objectID
              )
          );
          return [...prevGlasses, ...newItems];
        });
        setNbPages(data.nbPages ?? 1);
      } catch (error) {
        console.error("Error fetching glasses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [page, ALGOLIA_INDEX_NAME, nbPages, setSortOrder, filters, sortOrder]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < nbPages - 1) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, page, nbPages]
  );
  const handleSelectGlasses = (glass: AlgoliaProduct) => {
    setSelectedGlasses(glass);
    openDetailModal();
  };
  return (
    <div className="px-12 py-10 bg-white min-h-screen w-full">
      <button
        className="absolute top-0 right-10 p-4 rounded-b-full bg-primaryL1"
        onClick={handleNavigateHome}
      >
        <p className="bg-white p-4 rounded-full">
          <RxCross2 className="text-black" size={36} />
        </p>
      </button>
      <h1 className="text-grayscale600 font-bold text-[80px]">Catalogue</h1>
      <CatalogHeadder />

      <Filter />

      {glasses.length === 0 && !isLoading && filters && (
        <div className="flex flex-col items-center justify-center mt-10 ">
          <p className="text-gray-500 text-lg">
            Oops! No products match your filters.
          </p>
        </div>
      )}
      <div
        className={`mt-10 grid  border rounded-48px max-h-[86vh] overflow-y-auto hide-scrollbar ${
          glasses.length <= 1 ? "grid-cols-1 " : "grid-cols-2 "
        }`}
      >
        {glasses.map((item, index) => (
          <div key={item.objectID} onClick={() => handleSelectGlasses(item)}>
            <CatalogCard
              key={item.objectID}
              data={{
                name: item.name,
                description: item.description,
                priceDutyFree: item.priceDutyFree,
                imageUrlBase: item.imageUrlBase,
                currency: item.currency,
                brand: item.brand,
                objectID: item.objectID,
              }}
              index={index}
              totalItems={glasses.length}
            />
          </div>
        ))}
        <div ref={lastItemRef}></div>
      </div>
      <DetailModal />
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export default Catalog;

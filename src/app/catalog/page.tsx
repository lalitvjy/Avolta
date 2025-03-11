"use client";
import CatalogHeadder from "@/components/catalog-header/catalog-header";
import Filter from "@/components/filter/filter";
import { fetchGlasses } from "@/helpers/algolia/algolia";
import { AlgoliaProduct } from "@/types/algoliaTypes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import CatalogCard from "../../components/card/catalog-card";

const Catalog = () => {
  const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;
  const [glasses, setGlasses] = useState<AlgoliaProduct[]>([]);
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
          page
        );

        setGlasses((prevGlasses) => {
          const newItems = data.hits.filter(
            (item) =>
              !prevGlasses.some(
                (existing) => existing.objectID === item.objectID
              )
          );

          return [...prevGlasses, ...newItems];
        });
        console.log(data);
        setNbPages(data.nbPages ?? 1);
      } catch (error) {
        console.error("Error fetching glasses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, ALGOLIA_INDEX_NAME, nbPages]);

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

  return (
    <div className="px-12 py-10 bg-white">
      <button
        className="absolute top-0 right-10 p-4 rounded-b-full bg-primaryL1"
        onClick={handleNavigateHome}
      >
        <p className="bg-white p-4 rounded-full">
          <RxCross1 className="text-black" size={24} />
        </p>
      </button>
      <h1 className="text-grayscale600 font-bold text-5xl">Catalogue</h1>
      <CatalogHeadder />
      <Filter />

      <div className="mt-6 grid grid-cols-2 border rounded-3xl">
        {glasses.map((item, index) => (
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
        ))}
      </div>

      <div ref={lastItemRef} className="h-20 w-full"></div>

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export default Catalog;

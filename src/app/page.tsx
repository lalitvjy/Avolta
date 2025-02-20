"use client";
import DetailModal from "@/app/components/modals/detail-modal/detail-modal";
import { useModalStore } from "@/app/store/useDetailModal";
import Button from "./components/button/button";

export default function Home() {
  const { openDetailModal } = useModalStore();
  return (
    <div className="flex justify-around font-[family-name:var(--font-geist-sans)]">
      <Button
        variant="primary"
        rounded
        onClick={openDetailModal}
        label="See Details"
      />

      <DetailModal />
    </div>
  );
}

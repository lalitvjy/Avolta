"use client";
import Filter from "@/components/filter/filter";
import Footer from "@/components/footer/footer";
import GlassesInfo from "@/components/glasses-info/glasses-info";
import Header from "@/components/header/header";
import EmailModal from "@/components/modals/email-modal/email-modal";
import ReceiveSelfie from "@/components/modals/receive-selfie-modal/receive-selfie";
import { useDetailModalStore } from "@/store/useDetailModal";
import { useEmailModalStore } from "@/store/useEmailModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import MainImage from "../../../public/image 2.jpg";
import Button from "../../components/button/button";
import DetailModal from "../../components/modals/detail-modal/detail";
import Slider from "../../components/slider/slider";
const Avolta = () => {
  const { openDetailModal } = useDetailModalStore();
  const { openEmailModal } = useEmailModalStore();
  const router = useRouter();
  const handelNavigateCatalog = () => {
    router.push("/bookmark");
  };
  return (
    <div className="bg-gradient-avolta  py-4 h-screen flex-1">
      <Header />
      <div className="flex   justify-center w-full pt-8 px-4">
        <div className="relative w-full   h-[60vh] bg-black rounded-40px overflow-hidden">
          <Image src={MainImage} alt="Main image" layout="fill" />
          <div className="absolute bottom-5 left-5 flex gap-2 ">
            <GlassesInfo />
          </div>
          <div className="absolute bottom-5 right-5 flex gap-2 ">
            <Button
              rounded
              onClick={openDetailModal}
              label="See Details"
              className="text-black font-bold"
            />
            <Button
              rounded
              onClick={openEmailModal}
              label="Email"
              leftIcon={<MdOutlineMailOutline />}
              className="text-black font-bold"
            />
            <Button
              rounded
              onClick={handelNavigateCatalog}
              label="Wishlit"
              leftIcon={<FaHeart className="text-red-600" />}
              className="text-black font-bold"
            />
          </div>
        </div>
      </div>

      <Slider />
      <Footer />
      <Filter />
      <DetailModal />
      <EmailModal />
      <ReceiveSelfie />
    </div>
  );
};

export default Avolta;

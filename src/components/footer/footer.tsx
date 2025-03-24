import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoChevronForwardSharp } from "react-icons/io5";
import Catalog from "../../../public/catalog.svg";
import Selfie from "../../../public/ic-sefie.svg";
import Button from "../button/button";
interface FooterProps {
  isLoading?: boolean;
  isApplyingGlasses?: boolean;
}
const Footer = ({ isLoading, isApplyingGlasses }: FooterProps) => {
  const router = useRouter();
  const handelNavigateCatalog = () => {
    if (!isLoading) {
      router.push("catalog");
    }
  };
  const { openReceiveSelfieModal } = useReceiveSelfieModalStore();
  return (
    <div className="flex justify-between items-center px-8 pt-16  ">
      <Button
        label="Catalogue"
        rounded
        onClick={handelNavigateCatalog}
        className={`py-3 pl-3 pr-6 gap-4 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        leftIcon={<Image src={Catalog} width={48} height={48} alt="catalog" />}
      />
      <Button
        label="Receive you selfie!"
        rounded
        disabled={isApplyingGlasses}
        onClick={openReceiveSelfieModal}
        leftIcon={<Image src={Selfie} width={24} height={24} alt="catalog" />}
        rightIcon={<IoChevronForwardSharp />}
        className={`px-6 py-6 ${
          isApplyingGlasses ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default Footer;

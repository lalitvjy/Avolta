import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoChevronForwardSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Catalog from "../../../public/catalog.svg";
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
        variant="secondary"
        onClick={handelNavigateCatalog}
        className={`py-4 pl-4 pr-6 gap-4 text-4xl font-bold ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        leftIcon={<Image src={Catalog} width={48} height={48} alt="catalog" />}
      />
      <Button
        label="Receive you selfie!"
        rounded
        variant="secondary"
        disabled={isApplyingGlasses}
        onClick={openReceiveSelfieModal}
        leftIcon={<MdOutlineEmail size={48} />}
        rightIcon={<IoChevronForwardSharp size={48} />}
        className={`px-4 py-4 text-4xl font-bold ${
          isApplyingGlasses ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default Footer;

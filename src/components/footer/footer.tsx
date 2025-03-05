import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoChevronForwardSharp } from "react-icons/io5";
import Catalog from "../../../public/catalog.svg";
import Selfie from "../../../public/ic-sefie.svg";
import Button from "../button/button";
const Footer = () => {
  const router = useRouter();
  const handelNavigateCatalog = () => {
    router.push("catalog");
  };
  const { openReceiveSelfieModal } = useReceiveSelfieModalStore();
  return (
    <div className="flex justify-between items-center px-8 pt-16  ">
      <Button
        label="Catalogue"
        rounded
        onClick={handelNavigateCatalog}
        className="py-3 pl-3 pr-6 gap-4"
        leftIcon={<Image src={Catalog} width={48} height={48} alt="catalog" />}
      />
      <Button
        label="Receive you selfie!"
        rounded
        onClick={openReceiveSelfieModal}
        leftIcon={<Image src={Selfie} width={24} height={24} alt="catalog" />}
        rightIcon={<IoChevronForwardSharp />}
        className="px-6 py-6"
      />
    </div>
  );
};

export default Footer;

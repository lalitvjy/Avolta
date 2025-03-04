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
    <div className="flex justify-between px-8 pt-16 ">
      <Button
        label="Catalogue"
        rounded
        onClick={handelNavigateCatalog}
        className="py-3"
        leftIcon={<Image src={Catalog} width={20} height={20} alt="catalog" />}
      />
      <Button
        label="Receive you selfie!"
        rounded
        onClick={openReceiveSelfieModal}
        leftIcon={<Image src={Selfie} width={20} height={20} alt="catalog" />}
        rightIcon={<IoChevronForwardSharp />}
      />
    </div>
  );
};

export default Footer;

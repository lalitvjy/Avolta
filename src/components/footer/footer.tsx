import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useUserInfo } from "@/store/useUserInfo";
import { logGetRecommendations, logViewCatalogue } from "@/utils/analytics";
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
  const { name, email } = useUserInfo();
  const { recommendations } = useRecommendetGlassStore();

  const handelNavigateCatalog = () => {
    if (!isLoading) {
      logViewCatalogue(email, name);
      router.push("catalog");
    }
  };
  const { openReceiveSelfieModal } = useReceiveSelfieModalStore();

  const handelOpenReceiveSelfieModal = () => {
    openReceiveSelfieModal();
    const recommendedSkus = recommendations
      .map((item) => item.sku)
      .filter(Boolean);

    if (recommendedSkus.length > 0) {
      logGetRecommendations(recommendedSkus, email, name);
    }
  };
  return (
    <div className=" flex justify-between items-center px-8 pt-16 gap-64 ">
      {/* <Button
        label=" View catalogue"
        rounded
        variant="secondary"
        onClick={handelNavigateCatalog}
        className={`py-12 pl-12 pr-16 text-4xl  gap-4 font-bold ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        leftIcon={<Image src={Catalog} width={48} height={48} alt="catalog" />}
      />
      <Button
        label=" Get recommendations"
        rounded
        variant="secondary"
        disabled={isApplyingGlasses}
        onClick={openReceiveSelfieModal}
        leftIcon={<MdOutlineEmail size={48} />}
        rightIcon={<IoChevronForwardSharp size={48} />}
        className={`py-12 px-12 text-4xl font-bold ${
          isApplyingGlasses ? "opacity-50 cursor-not-allowed" : ""
        }`}
      /> */}
      <div className="flex-1">
        <Button
          label=" View catalogue"
          rounded
          variant="secondary"
          onClick={handelNavigateCatalog}
          className={`w-full py-12 pl-12 pr-16 text-4xl gap-4 font-bold ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          leftIcon={
            <Image src={Catalog} width={48} height={48} alt="catalog" />
          }
        />
      </div>
      <div className="flex-1">
        <Button
          label=" Get recommendations"
          rounded
          variant="secondary"
          disabled={isApplyingGlasses}
          onClick={handelOpenReceiveSelfieModal}
          leftIcon={<MdOutlineEmail size={48} />}
          rightIcon={<IoChevronForwardSharp size={48} />}
          className={`w-full py-12 px-12 text-4xl font-bold ${
            isApplyingGlasses ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Footer;

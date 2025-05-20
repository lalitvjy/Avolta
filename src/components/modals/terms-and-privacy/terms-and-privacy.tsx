import { useTermsModalStore } from "@/store/useTermsModal";
import Modal from "react-bootstrap/Modal";

import termsData from "../../../utils/term-and-privacy.json";
import TermsAndPrivacyFooter from "./terms-and-privacy-footer/terms-and-privacy-footer";
import TermsAndPrivacyHeader from "./terms-and-privacy-header/terms-and-privacy-header";

const TermsAndPrivacy = () => {
  const { isTermsModalOpen, closeTermsModal } = useTermsModalStore();

  return (
    <Modal
      show={isTermsModalOpen}
      onHide={closeTermsModal}
      centered
      size="xl"
      dialogClassName="border-radius-1"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div className="w-full max-w-screen-sm md:max-w-screen-md mx-auto p-4 md:p-8 bg-white rounded-3xl overflow-y-auto max-h-[90vh] text-base md:text-lg">
        <TermsAndPrivacyHeader />
        <div className="p-2 md:p-4">
          <ol className="list list-inside space-y-2 font-bold text-sm md:text-base text-grayscale600">
            {termsData.terms.map((item, index) => (
              <li key={index}>
                {item.title}
                <ul className="list-disc list-inside text-grayscale600 ml-6 font-normal text-sm md:text-base">
                  {item.content.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div>
            <br />
            <ol className="list list-inside space-y-2 font-bold text-sm md:text-base text-grayscale600 ">
              {termsData.privacyPolicy.map((item, index) => (
                <li key={index}>
                  {item.title}
                  <ul className="list-disc list-inside text-grayscale600 ml-6 font-normal text-sm md:text-base">
                    {item.content.map((line, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: line }}></li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <TermsAndPrivacyFooter />
      </div>
    </Modal>
  );
};

export default TermsAndPrivacy;

import Button from "@/components/button/button";
import { sendEmail } from "@/helpers/send-email/sendEmail";
import { useEmailModalStore } from "@/store/useEmailModal";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useUserInfo } from "@/store/useUserInfo";
import { logEmailSkuClose, logEmailSkuSend } from "@/utils/analytics";
const EmailModalFooter = () => {
  const { closeEmailModal } = useEmailModalStore();
  const { name, email, setName, setEmail } = useUserInfo();
  const { selectedGlasses } = useSelectedGlassesStore();

  const handleSend = async () => {
    let objects;
    if (selectedGlasses) {
      objects = [
        {
          brand: selectedGlasses.brand || "Unknown Brand",
          imageUrlBase: selectedGlasses.imageUrlBase ?? "",
          priceDutyFree: selectedGlasses.priceDutyFree ?? 0,
          productUrl: selectedGlasses.productUrl || "",
          triedOnImage: selectedGlasses.triedOnUrl || "",
        },
      ];
      logEmailSkuSend(selectedGlasses.sku, email, name);
    }

    try {
      await sendEmail({
        name,
        email,
        purpose: "selfie",
        objects,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      if (selectedGlasses) {
        logEmailSkuClose(selectedGlasses.sku, email, name);
      }
      closeEmailModal();
    }
  };

  return (
    <div className="flex justify-center items-center gap-32 text-black">
      <div>
        <p className="font-bold text-3xl pb-12 text-center">Receive an email</p>

        <div className="space-y-12">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[30vh] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[30vh] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
            />
          </div>

          <Button
            label="Send"
            className="rounded-lg font-bold w-full py-3"
            variant="secondary"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailModalFooter;

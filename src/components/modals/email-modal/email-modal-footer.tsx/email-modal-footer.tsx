import Button from "@/components/button/button";
import { sendEmail } from "@/helpers/send-email/sendEmail";
import { useEmailModalStore } from "@/store/useEmailModal";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useUserInfo } from "@/store/useUserInfo";
import { QRCodeCanvas } from "qrcode.react";
const EmailModalFooter = () => {
  const { uuid } = useRecommendetGlassStore();
  const qrUrl = `https://glass-recommendations.mirrar.com/${uuid}`;
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
      closeEmailModal();
    }
  };

  return (
    <div className="flex justify-center items-center gap-32 text-black">
      <div>
        <p className="font-bold text-lg pb-4 text-center">Scan the code</p>
        {uuid ? (
          <QRCodeCanvas value={qrUrl} size={300} />
        ) : (
          <p className="text-sm text-gray-500">Generating QR...</p>
        )}
      </div>
      <div>
        <p className="font-bold text-3xl pb-12">Get it on your inbox</p>

        <div className="space-y-8">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[20vh] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[20vh] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
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

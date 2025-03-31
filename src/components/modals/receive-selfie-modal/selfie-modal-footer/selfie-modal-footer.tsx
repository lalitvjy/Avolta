import Button from "@/components/button/button";
import { sendEmail } from "@/helpers/send-email/sendEmail";
import { useReceiveSelfieModalStore } from "@/store/useReceiveSelfieModal";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { useUserInfo } from "@/store/useUserInfo";
import { resetUserFlow } from "@/utils/resetUserFlow";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
const SelfieModalFooter = () => {
  const { uuid, recommendations } = useRecommendetGlassStore();
  const router = useRouter();
  const { closeReceiveSelfieModal } = useReceiveSelfieModalStore();

  const { name, email, setName, setEmail } = useUserInfo();
  const qrUrl = `https://glass-recommendations.mirrar.com/${uuid}`;

  const handleSend = async () => {
    const objects = recommendations.map((item) => ({
      brand: item.brand || "Unknown",
      imageUrlBase: item.imageUrlBase ?? "",
      priceDutyFree: item.priceDutyFree ?? 0,
      productUrl: item.productUrl || "",
      triedOnImage: item.triedOnUrl || "",
    }));

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
      closeReceiveSelfieModal();
      router.push("/");
      resetUserFlow();
    }
  };

  return (
    <div className="flex items-center justify-center p-10 gap-40 h-full text-black">
      <div>
        <p className="font-bold text-2xl pb-4 text-center">Scan the code</p>
        {uuid ? (
          <QRCodeCanvas value={qrUrl} size={300} />
        ) : (
          <p className="text-2xl text-gray-500">Generating QR...</p>
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
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
            />
          </div>

          <Button
            label="Send"
            className="rounded-lg font-bold w-full py-3 text-3xl"
            variant="secondary"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default SelfieModalFooter;

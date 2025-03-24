import Button from "@/components/button/button";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { QRCodeCanvas } from "qrcode.react";

const SelfieModalFooter = () => {
  const { uuid } = useRecommendetGlassStore();

  const qrUrl = `https://glass-recommendations.mirrar.com/${uuid}`;

  return (
    <div className="flex items-center justify-center p-10 gap-40 h-full text-black">
      <div>
        <p className="font-bold text-lg pb-4 text-center">Scan the code</p>
        {uuid ? (
          <QRCodeCanvas value={qrUrl} size={200} />
        ) : (
          <p className="text-sm text-gray-500">Generating QR...</p>
        )}
      </div>

      <div>
        <p className="font-bold text-lg pb-12">Get it on your inbox</p>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-[20vh] p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryAvolta"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryAvolta"
            />
          </div>

          <Button
            label="Send"
            className="rounded-lg font-bold w-full"
            variant="secondary"
          />
        </form>
      </div>
    </div>
  );
};

export default SelfieModalFooter;

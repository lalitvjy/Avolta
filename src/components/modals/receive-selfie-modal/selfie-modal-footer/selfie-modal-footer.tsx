import Button from "@/components/button/button";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { QRCodeCanvas } from "qrcode.react";

const SelfieModalFooter = () => {
  const { uuid } = useRecommendetGlassStore();

  const qrUrl = `https://glass-recommendations.mirrar.com/${uuid}`;

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
        <form className="space-y-8">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-[20vh] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryAvolta text-xl"
            />
          </div>

          <Button
            label="Send"
            className="rounded-lg font-bold w-full py-3 text-3xl"
            variant="secondary"
          />
        </form>
      </div>
    </div>
  );
};

export default SelfieModalFooter;

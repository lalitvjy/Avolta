import Button from "@/components/button/button";
import { useRecommendetGlassStore } from "@/store/useRecommendetGlass";
import { QRCodeCanvas } from "qrcode.react";
const EmailModalFooter = () => {
  const { uuid } = useRecommendetGlassStore();

  const qrUrl = `https://glass-recommendations.mirrar.com/${uuid}`;
  return (
    <div className="flex justify-center items-center gap-32 text-black">
      <div>
        <p className="font-bold text-lg pb-4 text-center">Scan the code</p>
        {uuid ? (
          <QRCodeCanvas value={qrUrl} size={200} />
        ) : (
          <p className="text-sm text-gray-500">Generating QR...</p>
        )}
      </div>
      <div>
        <p>Get it on our inbox</p>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              className=" w-[20vh] p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryAvolta"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className=" w-full p-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryAvolta"
            />
          </div>

          <Button
            label="Send"
            className="rounded-lg font-bold w-full py-3"
            variant="secondary"
          />
        </form>
      </div>
    </div>
  );
};

export default EmailModalFooter;

import Button from "@/components/button/button";
import Image from "next/image";
import MainImage from "../../../../../public/Image 4.jpg";
const EmailModalFooter = () => {
  return (
    <div className="flex justify-between  ">
      <div>
        <p className="font-bold text-lg leading-5 mb-2">Scan the code</p>
        <Image src={MainImage} alt="qr code" className="w-[10vh] h-[10vh]" />
      </div>
      <div>
        <p>Get it on our inbox</p>
        <form className="space-y-2">
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
            className="rounded-lg font-bold w-full"
            variant="secondary"
          />
        </form>
      </div>
    </div>
  );
};

export default EmailModalFooter;

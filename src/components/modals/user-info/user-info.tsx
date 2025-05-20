"use client";
import { sendEmail } from "@/helpers/send-email/sendEmail";
import { useFavoriteGlassesStore } from "@/store/useFavoriteGlassesStore";
import { useSelectedGlassesStore } from "@/store/useSelectedGlasses";
import { useUserInfo } from "@/store/useUserInfo";
import { useRouter } from "next/navigation";
import { Form, Modal } from "react-bootstrap";
import Button from "../../button/button";
interface UserInfoProps {
  purpose: string;
  buttonlabel: string;
}
const UserInfo = ({ purpose, buttonlabel }: UserInfoProps) => {
  const router = useRouter();
  const { isUserModalOpen, closeUserModal, name, email, setName, setEmail } =
    useUserInfo();

  const handelContinue = async () => {
    let objects;

    if (purpose === "wishlist") {
      const { favorites } = useFavoriteGlassesStore.getState();
      objects = favorites.map((item) => ({
        brand: item.brand || "Unknown Brand",
        imageUrlBase: item.imageUrlBase ?? "",
        priceDutyFree: item.priceDutyFree ?? 0,
        productUrl: item.productUrl || "",
        triedOnImage: item.triedOnUrl || "",
      }));
    }

    if (purpose === "product-details") {
      const { selectedGlasses } = useSelectedGlassesStore.getState();
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
    }

    if (purpose !== "user-info") {
      try {
        await sendEmail({
          name,
          email,
          purpose,
          ...(objects ? { objects } : {}),
        });
      } catch (error) {
        console.error("Failed to send user info email:", error);
      }
    }

    closeUserModal();
    router.push("/avolta");
  };

  const handelClose = () => {
    closeUserModal();
    router.push("/avolta");
  };
  return (
    <Modal
      show={isUserModalOpen}
      onHide={closeUserModal}
      centered
      size="lg"
      dialogClassName="border-radius-2"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div className=" bg-white rounded-[64px]  text-black py-14 px-10">
        
        <p className="text-xl font-medium text-center leading-[130%] py-4">
          <b>Share an email to receive details of your <br />favorite sunglasses</b>
          <br />
          <br />
          
        </p>
        <Form className="text-xl">
          <Form.Group className="mb-6">
            <Form.Label className=" font-medium leading-[130%]">
              Your name
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="py-4 px-3 border border-gray200  text-xl rounded-lg"
            />
          </Form.Group>

          <Form.Group className="mb-6">
            <Form.Label className=" font-medium leading-[130%]">
              Your email
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="py-4 px-3 border border-gray200 text-xl  rounded-lg"
            />
          </Form.Group>
        </Form>

        <div className="flex justify-center flex-col text-xl">
          <Button
            label={buttonlabel}
            variant="secondary"
            rounded
            onClick={handelContinue}
            className="font-bold py-6"
          />
          <button
            onClick={handelClose}
            className="font-bold text-gray400  mt-7"
          >
            I’ll do this later
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfo;

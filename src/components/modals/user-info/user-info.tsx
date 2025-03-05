"use client";
import { useUserInfo } from "@/store/useUserInfo";
import { Form, Modal } from "react-bootstrap";
import Button from "../../button/button";

import { useRouter } from "next/navigation";
const UserInfo = () => {
  const router = useRouter();
  const { isUserModalOpen, closeUserModal, name, email, setName, setEmail } =
    useUserInfo();

  const handelContinue = () => {
    closeUserModal();
    router.push("AI");
  };
  const handelClose = () => {
    closeUserModal();
    router.push("AI");
  };
  return (
    <Modal
      show={isUserModalOpen}
      onHide={closeUserModal}
      centered
      size="lg"
      dialogClassName="border-radius-1"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div className=" bg-white rounded-[64px]  text-black py-14 px-28">
        <h2 className="text-4xl font-bold   text-center ">Tell Us About You</h2>
        <p className="text-base font-medium text-center">
          Share an email to receive your favorite <br /> sunglasses in your
          inbox
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="text-sm font-medium">Your Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="p-2 border border-gray-200 text-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-sm font-medium">Your Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="p-2 border border-gray-200 text-sm"
            />
          </Form.Group>
        </Form>

        <div className="flex justify-center flex-col">
          <Button
            label="Save and Continue"
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

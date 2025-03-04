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
      <div className="p-6 bg-white  rounded-3xl text-black">
        <h2 className="text-4xl font-bold  leading-10 text-center">
          Tell Us About You
        </h2>
        <p className="text-base font-medium leading-5 text-center">
          Share an email to receive your favorite sunglasses in your inbox
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
            className="font-bold"
          />
          <Button
            label="I’ll do this later"
            onClick={handelClose}
            className="font-bold text-gray-400"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UserInfo;

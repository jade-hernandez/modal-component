"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Modal } from "../data";

export default function HelloWorld() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalVariant, setModalVariant] = useState<"primary" | "danger">("primary");

  const handleClose = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };

  const handleYes = () => {
    if (modalVariant === "primary") {
      // First Yes click - switch to danger variant
      console.log("First confirmation - switching to danger variant");
      setModalVariant("danger");
    } else {
      // Second Yes click - perform actual action
      console.log("Final confirmation - User confirmed action");
      // Perform your action here
      handleClose(); // Close after confirmation
    }
  };

  const handleNo = () => {
    console.log("User clicked No");
    handleClose();
  };

  return (
    <div className="flex flex-col items-center">
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        showCloseButton={true}
        size="sm"
        position="center"
        title="Are you sure you want to leave the process?"
        description="Your upgrade plan process will be cancelled. You need to start again if you leave the process."
      >
        <div className="flex gap-3 mt-8">
          <Button
            onClick={handleNo}
            textContent="No"
            variant="secondary"
            size="lg"
          />
          <Button
            onClick={handleYes}
            textContent={modalVariant === "primary" ? "Yes" : "Delete"}
            variant={modalVariant === "danger" ? "destructive" : "primary"}
            size="lg"
          />
        </div>
      </Modal>
    </div>
  );
}
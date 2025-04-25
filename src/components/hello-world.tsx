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
    // Toggle between primary and danger variants when Yes is clicked
    if (modalVariant === "primary") {
      console.log("Switching to danger variant");
      setModalVariant("danger");
    } else {
      console.log("Switching to primary variant");
      setModalVariant("primary");
    }
  };

  const handleNo = () => {
    console.log("User clicked No");
    handleClose();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        showCloseButton={true}
        size="sm"
        position="center"
        title="Are you sure you want to leave the process?"
        description="Your upgrade plan process will be cancelled. You need to start again if you leave the process."
      >
        <div className="flex gap-3">
          <Button
            onClick={handleNo}
            textContent="No"
            variant="secondary"
            size="lg"
          />
          <Button
            onClick={handleYes}
            textContent="Yes"
            variant={modalVariant === "danger" ? "destructive" : "primary"}
            size="lg"
          />
        </div>
      </Modal>
    </div>
  );
}
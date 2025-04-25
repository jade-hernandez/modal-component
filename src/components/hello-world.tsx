"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Modal } from "../data";

export default function HelloWorld() {
  // Create state to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Function to actually close the modal
  const handleClose = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };

  // Functions to handle button clicks
  const handleYes = () => console.log("User clicked Yes");
  const handleNo = () => console.log("User clicked No");

  return (
    <div className="gap-8 flex flex-col justify-center">
      <section>
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          showCloseButton={true}
          title="Are you sure you want to leave the process?"
          description="Your upgrade plan process will be cancelled. You need to start again if you leave the process."
        >
          <div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={handleNo}
                textContent="No"
                variant={"secondary"}
              />
              <Button
                onClick={handleYes}
                textContent="Yes"
                variant={"primary"}
              />


            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
}



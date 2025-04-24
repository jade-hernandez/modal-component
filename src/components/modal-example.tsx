import { Button } from "@/components/ui/button";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useRef, useState } from "react";

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  // Use the focus trap with isActive boolean
  useFocusTrap(modalRef, isModalOpen);

  return (
    <div className="p-4">
      {/* Trigger button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        textContent='Open Modal'
      />

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div
            ref={modalRef}
            className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'
          >
            <h2 className='mb-4 text-xl font-semibold'>Hello World Modal</h2>

            {/* Some focusable elements to demonstrate the trap */}
            <input
              type='text'
              placeholder='Type something...'
              className='mb-4 w-full rounded border p-2'
            />

            <select className='mb-4 w-full rounded border p-2'>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <div className='flex gap-2'>
              <Button textContent='Action' />
              <Button
                onClick={() => setIsModalOpen(false)}
                textContent='Close'
                variant='secondary'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
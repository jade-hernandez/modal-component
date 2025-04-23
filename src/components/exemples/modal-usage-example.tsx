import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ToggleSwitch } from "@/components/ui/toggle-button";

export const ModalUsageExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookiesConsent1, setCookiesConsent1] = useState<boolean>(false);
  const [cookiesConsent2, setCookiesConsent2] = useState<boolean>(false);
  const [cookiesConsent3, setCookiesConsent3] = useState<boolean>(false);

  return (
    <div className="p-4">
      {/* Trigger button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        textContent='Open UI Modal Component'
      />

      {/* Modal using the UI Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="UI Modal Component Example"
        description="This modal uses the reusable Modal component from your UI library"
        showCloseButton={true}
        size="md"
        position="center"
      >
        {/* Modal content */}
        <div className="space-y-4">
          <input
            type='text'
            placeholder='Type something...'
            className='w-full rounded border p-2'
          />

          <select className='w-full rounded border p-2'>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-700'>Cookies Consent (Small)</span>
            <ToggleSwitch
              size='sm'
              checked={cookiesConsent1}
              onCheckedChange={setCookiesConsent1}
            />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-700'>Cookies Consent (Default)</span>
            <ToggleSwitch
              checked={cookiesConsent2}
              onCheckedChange={setCookiesConsent2}
            />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-700'>Cookies Consent (Medium)</span>
            <ToggleSwitch
              size='md'
              checked={cookiesConsent3}
              onCheckedChange={setCookiesConsent3}
            />
          </div>

          <div className='flex gap-2 pt-4'>
            <Button textContent='Action' />
            <Button
              onClick={() => setIsModalOpen(false)}
              textContent='Close'
              variant='secondary'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
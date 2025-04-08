import { Tooltip } from "@/components/ui/tooltip";

export const TooltipExample = () => {
  return (
    <div className='p-4'>
      <Tooltip content="This is a tooltip" position="top">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Hover me
        </button>
      </Tooltip>
    </div>
  );
};
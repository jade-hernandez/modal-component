"use client";

import { ModalExample } from "./exemples/modal-exemple";
import { PriceCardExample } from "./exemples/price-card-exemple";
import { TooltipExample } from "./exemples/tooltip-exemple";



export default function HelloWorld() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pricing Cards</h2>
        <PriceCardExample />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tooltip Component</h2>
        <TooltipExample />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Modal Component</h2>
        <ModalExample />
      </section>
    </div>
  );
}


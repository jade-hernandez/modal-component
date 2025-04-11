"use client";

import { ModalExample } from "./exemples/modal-exemple";
import { ModalUsageExample } from "./exemples/modal-usage-exemple";
import { PriceCardExample } from "./exemples/price-card-exemple";
import { TooltipExample } from "./exemples/tooltip-exemple";



export default function HelloWorld() {
  return (
    <div className="gap-8 flex flex-col  justify-center ">
      <section>
        <h2 className="text-2xl font-semibold ">Pricing Cards Component</h2>
        <PriceCardExample />
      </section>

      <section>
        <h2 className="text-2xl font-semibold ">Tooltip Component</h2>
        <TooltipExample />
      </section>

      <section>
        <h2 className="text-2xl font-semibold ">Modal Component</h2>
        <p className="text-base">Demonstrates custom modal functionality with focus trap</p>
        <ModalExample />
      </section>

      <section>
        <h2 className="text-2xl font-semibold ">UI Library Modal Component</h2>
        <p className="text-base">This modal shows how to use the reusable Modal component from the UI library </p>
        <ModalUsageExample />
      </section>
    </div>
  );
}


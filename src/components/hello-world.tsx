"use client";

import { ModalExample } from "./modal-example";


export default function HelloWorld() {
  return (
    <div className="gap-8 flex flex-col  justify-center ">
      <section>
        <h2 className="text-2xl font-semibold ">Modal Component</h2>
        <p className="text-base">Demonstrates custom modal functionality with focus trap</p>
        <ModalExample />
      </section>
    </div>
  );
}


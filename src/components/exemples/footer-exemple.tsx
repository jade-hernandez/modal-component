"use client";

import { defaultIcons, sectionsData } from "data/footer-data";
import { useMemo } from "react";
import { Footer } from "../ui/footer";

export default function FooterExemple() {
  const memoizedDefaultIcons = useMemo(() => defaultIcons.map((icon) => ({
    ...icon,
  })), []);

  const memoizedSectionsData = useMemo(() => sectionsData.map((section) => ({
    ...section,
  })), []);

  return (
    <section className='gfe-container'>
      <div className="p-4 justify-center items-center flex flex-col ">
        <Footer
          companyName="Abstractly, Inc."
          navItems={memoizedSectionsData}
          socialIcons={memoizedDefaultIcons}
        />
      </div>
    </section>
  );
}


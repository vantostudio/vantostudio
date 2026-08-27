"use client";

import { useState } from "react";
import { faqs } from "@/data/home";

export function Faq() {
  // -1 = every question collapsed; the section opens closed by default.
  const [open, setOpen] = useState(-1);

  return (
    <div className="border-t border-paper-line">
      {faqs.map(([question, answer], index) => {
        const expanded = open === index;
        return (
          <div data-fade className="border-b border-paper-line" key={question}>
            <button
              type="button"
              data-cursor={expanded ? "Close" : "Open"}
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 bg-transparent px-1 py-[clamp(22px,2.6vw,30px)] text-left text-ink"
            >
              <span className="font-serif text-[clamp(20px,2.4vw,32px)] leading-[1.1] tracking-[-0.01em]">{question}</span>
              <span className={`shrink-0 font-serif text-[28px] leading-none text-accent transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-400 ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="m-0 max-w-[62ch] px-1 pb-[clamp(24px,3vw,32px)] pr-[60px] text-[clamp(15px,1.4vw,18px)] leading-[1.7] text-[#4a463c]">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

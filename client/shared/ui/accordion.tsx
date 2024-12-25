"use client";

import { cn } from "@/utils/cn";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type AccordionProps = {
  title: string;
  content: string;
};

const Accordion = ({ title, content }: AccordionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen((open) => !open);

  const classes = cn("flex justify-between pl-4 pr-7 py-4 cursor-pointer", {
    "bg-primary-100": open === false,
    "bg-primary-200": open === true,
  });

  return (
    <div>
      <div onClick={handleClick} className={classes}>
        <span className="flex-1 text-text-primary font-semibold">{title}</span>
        {open ? (
          <Minus size={18} className="text-primary-300" />
        ) : (
          <Plus size={18} className="text-primary-300" />
        )}
      </div>
      {open && (
        <div className="px-5 py-4 bg-primary-100">
          <span>{content}</span>
        </div>
      )}
    </div>
  );
};

export default Accordion;

import React, { ComponentProps } from "react";
import Button from "./button";
import { X } from "lucide-react";

export type ModalProps = ComponentProps<"div"> & {
  open: boolean;

  onClose: () => void;
};

const Modal = ({ open, children, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="max-h-[800px] p-7 shadow-xl bg-white overflow-auto">
        <div className="mb-6 flex justify-end">
          <Button variant="tertiary" onClick={onClose}>
            <X />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import { cn } from "@/utils/cn";
import { ComponentPropsWithRef } from "react";

type TextAreaProps = ComponentPropsWithRef<"textarea"> & {
  label?: string;
  error?: string;
};

const TextArea = ({
  label,
  error,
  className,
  ...inputProps
}: TextAreaProps) => {
  const classes = cn(
    "block px-4 py-2.5 border border-primary-300 rounded-md resize-none",
    className
  );

  return (
    <div className="min-w-64 flex flex-col">
      {label && <label className="block mb-1">{label}</label>}
      <textarea className={classes} {...inputProps} />
      {error && <p className="text-sm text-text-error">{error}</p>}
    </div>
  );
};

export default TextArea;

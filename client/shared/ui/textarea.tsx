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
  const classes = cn("min-w-64 flex flex-col", className);

  return (
    <div className={classes}>
      {label && <label className="block mb-1 text-sm">{label}</label>}
      <textarea
        className="block px-4 py-2.5 border border-primary-250 rounded-md resize-none"
        {...inputProps}
      />
      {error && <p className="text-sm text-text-error">{error}</p>}
    </div>
  );
};

export default TextArea;

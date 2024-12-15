import { cn } from "@/utils/cn";
import { ComponentPropsWithRef } from "react";

type TextFieldProps = ComponentPropsWithRef<"input"> & {
  label?: string;
  error?: string;
};

const TextField = ({
  label,
  error,
  className,
  ...inputProps
}: TextFieldProps) => {
  const classes = cn("min-w-64 flex flex-col", className);

  return (
    <div className={classes}>
      {label && <label className="block mb-1 text-sm">{label}</label>}
      <input
        className="block px-4 py-2.5 border border-primary-250 rounded-md"
        {...inputProps}
      />
      {error && <p className="mt-1 text-xs text-text-error">{error}</p>}
    </div>
  );
};

export default TextField;

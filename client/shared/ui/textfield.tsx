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
  const classes = cn(
    "block px-4 py-2.5 border border-primary-250 rounded-md",
    className
  );

  return (
    <div className="min-w-64 flex flex-col">
      {label && <label className="block mb-1 text-sm">{label}</label>}
      <input className={classes} {...inputProps} />
      {error && <p className="text-sm text-text-error">{error}</p>}
    </div>
  );
};

export default TextField;

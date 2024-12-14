import { cn } from "@/utils/cn";
import { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant: "primary" | "secondary";
  size: "sm" | "md";
};

const Button = ({
  variant,
  size,
  className,
  children,
  ...btnProps
}: ButtonProps) => {
  const classes = cn(
    "inline-flex items-center justify-center rounded-md gap-1.5",
    {
      "bg-primary-300 text-white hover:bg-primary-400 active:bg-primary":
        variant === "primary",
      "text-outline border border-outline": variant === "secondary",
      "min-w-[100px] h-10 px-7": size === "sm",
      "min-w-[120px] h-11 px-6": size === "md",
    },
    className
  );

  return (
    <button className={classes} {...btnProps}>
      {children}
    </button>
  );
};

export default Button;

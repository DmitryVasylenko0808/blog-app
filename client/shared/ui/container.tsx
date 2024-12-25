import { cn } from "@/utils/cn";

type ContainerProps = {
  children?: React.ReactNode;
  size?: "lg" | "md";
  className?: string;
};

const Container = ({ children, className, size = "lg" }: ContainerProps) => {
  const classes = cn(
    "mx-auto min-h-full",
    {
      "max-w-container": size === "lg",
      "max-w-md-container": size === "md",
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Container;

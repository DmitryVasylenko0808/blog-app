import { cn } from "@/utils/cn";

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  const classes = cn("mx-auto min-h-full max-w-container", className);

  return <div className={classes}>{children}</div>;
};

export default Container;

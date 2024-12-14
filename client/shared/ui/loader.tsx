import { cn } from "@/utils/cn";
import { LoaderCircle } from "lucide-react";

type LoaderProps = {
  color: "primary" | "white";
  size: "sm" | "md";
};

const Loader = ({ color, size }: LoaderProps) => {
  const classes = cn("animate-spin", {
    "text-primary-300": color === "primary",
    "text-white": color === "white",
  });

  const sizeMap = new Map<typeof size, number>();
  sizeMap.set("sm", 24);
  sizeMap.set("md", 36);

  return <LoaderCircle size={sizeMap.get(size)} className={classes} />;
};

export default Loader;

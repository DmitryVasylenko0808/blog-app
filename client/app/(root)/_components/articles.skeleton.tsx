import { cn } from "@/utils/cn";

type ArticlesSkeletonProps = {
  countItems: number;
  className?: string;
};

const ArticlesSkeleton = ({ countItems, className }: ArticlesSkeletonProps) => {
  const classes = cn("animate-pulse flex flex-col space-y-11", className);

  return (
    <div className={classes}>
      {Array.from({ length: countItems }, (_, i) => (
        <div key={i}>
          <div className="w-11 h-5 mb-2 rounded-full bg-skeleton" />

          <div className="w-full h-5 mb-1.5 rounded-full bg-skeleton" />
          <div className="w-1/2 h-5 mb-5 rounded-full bg-skeleton" />

          <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
          <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
          <div className="w-1/3 h-4 rounded-full bg-skeleton" />
        </div>
      ))}
    </div>
  );
};

export default ArticlesSkeleton;

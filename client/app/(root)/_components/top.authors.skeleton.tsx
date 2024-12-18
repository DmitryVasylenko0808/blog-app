const TopAuthorsSkeleton = () => {
  return (
    <div className="mb-16 animate-pulse flex flex-col space-y-11">
      {Array.from({ length: 3 }, (_, i) => (
        <div className="flex gap-x-6 items-center" key={i}>
          <div className="w-20 h-20 rounded-full bg-skeleton" />
          <div>
            <div className="mb-2 w-52 h-6 bg-skeleton rounded-full" />
            <div className="w-24 h-3 bg-skeleton rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopAuthorsSkeleton;

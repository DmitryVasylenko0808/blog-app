import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="flex gap-x-9 animate-pulse">
      <div className="min-w-[520px] h-[520px] bg-skeleton" />
      <div className="flex-auto">
        <div className="w-1/4 h-5 mt-9 mb-6 rounded-full bg-skeleton" />
        <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
        <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
        <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
        <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
        <div className="w-full h-4 mb-1.5 rounded-full bg-skeleton" />
        <div className="w-1/2 h-4 mb-1.5 rounded-full bg-skeleton" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;

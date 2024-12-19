import React from "react";

type ResultPanelProps = {
  value?: string;
};

const ResultPanel = ({ value }: ResultPanelProps) => {
  return (
    <div className="mb-14 flex">
      <div className="pb-3 border-b-2 border-b-primary-300">
        <span>
          Articles by category <span className="font-semibold">{value}</span>
        </span>
      </div>
      <div className="flex-auto border-b border-b-outline" />
    </div>
  );
};

export default ResultPanel;

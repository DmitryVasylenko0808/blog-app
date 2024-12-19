import React from "react";

type ResultPanelProps = {
  title?: string | React.ReactNode;
};

const ResultPanel = ({ title }: ResultPanelProps) => {
  return (
    <div className="mb-14 flex">
      <div className="pb-3 border-b-2 border-b-primary-300">{title}</div>
      <div className="flex-auto border-b border-b-outline" />
    </div>
  );
};

export default ResultPanel;

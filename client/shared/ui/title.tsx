import React from "react";

type TitleProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  filledText?: string;
  normalText?: string;
  className?: string;
};

const Title = ({ as, filledText, normalText, className }: TitleProps) => {
  const children = (
    <>
      <span className="bg-primary-300 text-white">{filledText}</span>{" "}
      {normalText}
    </>
  );
  return React.createElement(as, { className }, children);
};

export default Title;

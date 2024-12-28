type NoDataProps = {
  text?: string;
};

const NoData = ({ text = "No Data" }: NoDataProps) => {
  return (
    <div className="flex justify-center text-lg text-text-meta font-medium">
      {text}
    </div>
  );
};

export default NoData;

import React from "react";

interface Props {
  value: string;
}

const DisplayRangeHandle: React.FC<Props> = ({ value }) => (
  <div className="bg-[#0f2c64] text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap">
    {value}
  </div>
);

export default DisplayRangeHandle;

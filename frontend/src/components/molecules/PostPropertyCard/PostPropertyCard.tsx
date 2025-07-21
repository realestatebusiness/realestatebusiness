import React from "react";
import { Button } from "../../atoms/Button";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";

const PostPropertyCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
      <Heading level={5} className="text-xs uppercase text-gray-400 mb-1">
        Post your property
      </Heading>
      <Heading level={3} className="text-xl mb-2">
        Looking for buyers for Plots/land?
      </Heading>
      <Paragraph>
        Sell or rent your residential / commercial property
      </Paragraph>
      <Button>Post your property for FREE</Button>
    </div>
  );
};

export default PostPropertyCard;
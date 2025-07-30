import React from "react";
import { Heading } from "../../atoms/Heading";
import { PostPropertyCard } from "../../molecules/PostPropertyCard";
import { Paragraph } from "../../atoms/Paragraph";
import { CustomImage } from "../../atoms/CustomImage";

const SellWithUsSection: React.FC = () => {
  return (
    <section className="text-center py-10 px-4">
      <Paragraph className="uppercase font-semibold text-xs mb-1">Do you have plot/land?</Paragraph>
      <Heading level={2} className="text-3xl md:text-4xl mb-8">
        Sell or Lease out your Plots/Land faster with 99acres
      </Heading>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <CustomImage
          src="../sell.jpg"
          alt="Couple listing plot on laptop"
          className="max-w-md w-full"
        />
        <PostPropertyCard />
      </div>
    </section>
  );
};
export default SellWithUsSection;